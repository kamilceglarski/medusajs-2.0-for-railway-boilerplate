import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Client } from "minio"
import multer from "multer"

export async function POST(
    req: MedusaRequest,
    res: MedusaResponse
): Promise<void> {
    try {
        // Sprawdź publishable key
        const publishableKey = req.headers['x-publishable-api-key'] as string
        if (!publishableKey) {
            res.status(401).json({
                type: "not_allowed",
                message: "Publishable API key required in the request header: x-publishable-api-key"
            })
            return
        }
        // Konfiguruj multer
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: { fileSize: 5 * 1024 * 1024 } // 5MB
        })

        // Parsuj multipart/form-data
        await new Promise((resolve, reject) => {
            upload.single('file')(req as any, res as any, (err) => {
                if (err) reject(err)
                else resolve(undefined)
            })
        })

        const file = (req as any).file

        if (!file) {
            res.status(400).json({ message: "Brak pliku do przesłania" })
            return
        }

        // Sprawdź rozmiar pliku (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            res.status(400).json({ message: "Plik jest za duży. Maksymalny rozmiar to 5MB." })
            return
        }

        // Sprawdź typ pliku
        if (!file.mimetype.startsWith('image/')) {
            res.status(400).json({ message: "Plik nie jest obrazem" })
            return
        }

        // Buffer jest już dostępny z multer
        const buffer = file.buffer

        // Utwórz MinIO client
        // Publiczny endpoint do generowania URL-i (np. https://cdn.example.com)
        const publicEndpoint = process.env.MINIO_ENDPOINT || 'localhost:9101'

        // Endpoint do połączenia SDK (np. 127.0.0.1:9101 lub minio:9000). Fallback do publicznego.
        const sdkEndpointRaw = process.env.MINIO_SDK_ENDPOINT || publicEndpoint

        // Usuń protokół do połączenia SDK i do ewentualnego parsowania portu
        const sdkEndpoint = sdkEndpointRaw.replace(/^https?:\/\//, '')
        const defaultPort = process.env.MINIO_PORT || '9101'
        const [host, port] = sdkEndpoint.includes(':') ? sdkEndpoint.split(':') : [sdkEndpoint, defaultPort]

        // SSL decyduj na podstawie SDK endpoint lub MINIO_USE_SSL, nie publicznego
        const useSSL = process.env.MINIO_USE_SSL === 'true' || sdkEndpointRaw.startsWith('https://')

        const minioClient = new Client({
            endPoint: host,
            port: parseInt(port),
            useSSL,
            accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
            secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
        })

        // Generuj unikalną nazwę pliku (bez prefiksu katalogu)
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileExtension = file.originalname?.split('.').pop() || 'jpg'
        const fileName = `${timestamp}-${randomString}.${fileExtension}`

        // Upload do MinIO
        const bucket = process.env.MINIO_BUCKET || 'medusa-media'
        console.log(`📤 Uploading to MinIO: bucket=${bucket}, file=${fileName}`)
        await minioClient.putObject(
            bucket,
            fileName,
            buffer,
            buffer.length,
            {
                'Content-Type': file.mimetype
            }
        )
        console.log(`✅ Successfully uploaded: ${fileName}`)

        // Generuj URL - użyj HTTPS jeśli publicEndpoint zaczyna się od https://
        const protocol = publicEndpoint.startsWith('https://') ? 'https' : 'http'
        const cleanEndpoint = publicEndpoint.replace(/^https?:\/\//, '') // Usuń protokół z endpoint
        const fileUrl = `${protocol}://${cleanEndpoint}/${bucket}/${fileName}`
        console.log(`🔗 Generated URL: ${fileUrl}`)

        res.json({
            file: {
                url: fileUrl,
                key: fileName
            }
        })

    } catch (error: any) {
        console.error('Upload error:', error)
        res.status(500).json({
            message: "Błąd podczas uploadu pliku",
            error: error.message
        })
    }
}
