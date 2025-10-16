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
        const endpoint = process.env.MINIO_ENDPOINT || 'localhost:9101'
        const [host, port] = endpoint.includes(':') ? endpoint.split(':') : [endpoint, '9101']

        const minioClient = new Client({
            endPoint: host,
            port: parseInt(port),
            useSSL: false,
            accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
            secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin'
        })

        // Generuj unikalną nazwę pliku
        const timestamp = Date.now()
        const randomString = Math.random().toString(36).substring(2, 15)
        const fileExtension = file.originalname?.split('.').pop() || 'jpg'
        const fileName = `uploads/${timestamp}-${randomString}.${fileExtension}`

        // Upload do MinIO
        await minioClient.putObject(
            process.env.MINIO_BUCKET || 'uploads',
            fileName,
            buffer,
            buffer.length,
            {
                'Content-Type': file.mimetype
            }
        )

        // Generuj URL
        const fileUrl = `http://${endpoint}/${process.env.MINIO_BUCKET || 'uploads'}/${fileName}`

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
