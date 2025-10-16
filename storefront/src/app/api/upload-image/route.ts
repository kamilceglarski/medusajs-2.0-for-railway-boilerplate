import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File

        if (!file) {
            return NextResponse.json(
                { message: 'Brak pliku do przesłania' },
                { status: 400 }
            )
        }

        // Sprawdź rozmiar pliku (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json(
                { message: 'Plik jest za duży. Maksymalny rozmiar to 5MB.' },
                { status: 400 }
            )
        }

        // Sprawdź typ pliku
        if (!file.type.startsWith('image/')) {
            return NextResponse.json(
                { message: 'Plik nie jest obrazem' },
                { status: 400 }
            )
        }

        // Przygotuj dane do wysłania do backendu
        const uploadData = new FormData()
        uploadData.append('file', file)

        // Wyślij do backendu Medusa
        const backendUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
        const response = await fetch(`${backendUrl}/store/upload`, {
            method: 'POST',
            headers: {
                'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
            },
            body: uploadData,
        })

        if (!response.ok) {
            const error = await response.text()
            console.error('Backend upload error:', error)
            return NextResponse.json(
                { message: 'Błąd podczas uploadu do serwera' },
                { status: 500 }
            )
        }

        const result = await response.json()

        return NextResponse.json({
            url: result.file.url,
            key: result.file.key,
        })

    } catch (error) {
        console.error('Upload error:', error)
        return NextResponse.json(
            { message: 'Wystąpił błąd podczas przesyłania pliku' },
            { status: 500 }
        )
    }
}
