"use client"

import React, { useState, useRef } from "react"
import { Button, Text } from "@medusajs/ui"
import { Camera, X } from "@medusajs/icons"

interface ImageUploadProps {
    onImagesChange: (images: string[]) => void
    maxImages?: number
    disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onImagesChange,
    maxImages = 3,
    disabled = false
}) => {
    const [images, setImages] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        if (images.length + files.length > maxImages) {
            alert(`Możesz dodać maksymalnie ${maxImages} zdjęć`)
            return
        }

        setUploading(true)

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // Sprawdź rozmiar pliku (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    throw new Error(`Plik ${file.name} jest za duży. Maksymalny rozmiar to 5MB.`)
                }

                // Sprawdź typ pliku
                if (!file.type.startsWith('image/')) {
                    throw new Error(`Plik ${file.name} nie jest obrazem.`)
                }

                const formData = new FormData()
                formData.append('file', file)

                const response = await fetch('/api/upload-image', {
                    method: 'POST',
                    body: formData,
                })

                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.message || 'Błąd podczas uploadu pliku')
                }

                const data = await response.json()
                return data.url
            })

            const uploadedUrls = await Promise.all(uploadPromises)
            const newImages = [...images, ...uploadedUrls]
            console.log('🔍 ImageUpload: upload successful, newImages:', newImages)
            setImages(newImages)
            onImagesChange(newImages)
        } catch (error: any) {
            alert(error.message || 'Błąd podczas uploadu zdjęć')
        } finally {
            setUploading(false)
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index)
        console.log('🔍 ImageUpload: removeImage called, newImages:', newImages)
        setImages(newImages)
        onImagesChange(newImages)
    }

    const openFileDialog = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <Text className="text-sm font-medium">Zdjęcia do personalizacji:</Text>
                <Text className="text-xs text-ui-fg-subtle">
                    ({images.length}/{maxImages})
                </Text>
            </div>

            {/* Upload button */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={openFileDialog}
                    disabled={disabled || uploading || images.length >= maxImages}
                    className="flex items-center gap-2"
                >
                    <Camera />
                    {uploading ? 'Przesyłanie...' : 'Dodaj zdjęcia'}
                </Button>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {/* Image previews */}
            {images.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                    {images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                            <img
                                src={imageUrl}
                                alt={`Personalizacja ${index + 1}`}
                                className="w-full h-24 object-cover rounded-md border"
                            />
                            <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                disabled={disabled}
                            >
                                <X />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Instructions */}
            <div className="text-xs text-ui-fg-subtle space-y-1">
                <p>• Maksymalny rozmiar pliku: 5MB</p>
                <p>• Obsługiwane formaty: JPG, PNG, GIF</p>
                <p>• Maksymalnie {maxImages} zdjęć</p>
            </div>
        </div>
    )
}

export default ImageUpload
