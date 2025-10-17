import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@medusajs/ui"
import { ArrowLeftMini, X, CreditCard, Camera } from "@medusajs/icons"

export const metadata: Metadata = {
    title: "Płatność nie powiodła się | Lumoria Studio",
    description: "Płatność nie została zrealizowana. Spróbuj ponownie lub wybierz inną metodę płatności.",
    robots: {
        index: false,
        follow: false,
    },
}

interface PaymentFailedProps {
    searchParams: {
        error?: string
        message?: string
        code?: string
    }
}

export default function PaymentFailed({ searchParams }: PaymentFailedProps) {
    const { error, message, code } = searchParams

    // Get error message based on error code
    const getErrorMessage = () => {
        if (message) return message

        switch (error) {
            case 'card_declined':
                return 'Karta została odrzucona przez bank. Sprawdź dane lub skontaktuj się z bankiem.'
            case 'insufficient_funds':
                return 'Niewystarczające środki na koncie. Sprawdź saldo lub użyj innej karty.'
            case 'expired_card':
                return 'Karta wygasła. Użyj innej karty lub zaktualizuj dane.'
            case 'invalid_cvc':
                return 'Nieprawidłowy kod CVC. Sprawdź dane karty.'
            case 'processing_error':
                return 'Wystąpił błąd podczas przetwarzania płatności. Spróbuj ponownie.'
            default:
                return 'Niestety, nie udało się zrealizować płatności. Sprawdź dane karty lub spróbuj inną metodę płatności.'
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                        <X className="w-10 h-10 text-red-600" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                        Płatność nie powiodła się
                    </h1>
                    <p className="text-lg text-slate-600 max-w-lg mx-auto">
                        {getErrorMessage()}
                    </p>
                </div>

                {/* Error Details */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-red-200">
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <CreditCard className="w-6 h-6 text-red-600 mt-1" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold text-slate-900 mb-2">
                                {code ? `Kod błędu: ${code}` : 'Możliwe przyczyny:'}
                            </h2>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Nieprawidłowe dane karty płatniczej
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Niewystarczające środki na koncie
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Karta została zablokowana przez bank
                                </li>
                                <li className="flex items-start">
                                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                    Problem techniczny z systemem płatności
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button
                            asChild
                            size="large"
                            className="flex-1 bg-slate-800 hover:bg-slate-900 text-white px-8 py-4 text-lg font-semibold"
                        >
                            <Link href="/checkout" className="flex items-center justify-center">
                                <Camera className="w-5 h-5 mr-2" />
                                Spróbuj ponownie
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="large"
                            variant="secondary"
                            className="flex-1 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 text-lg font-semibold"
                        >
                            <Link href="/cart" className="flex items-center justify-center">
                                <ArrowLeftMini className="w-5 h-5 mr-2" />
                                Wróć do koszyka
                            </Link>
                        </Button>
                    </div>

                    <div className="text-center">
                        <Button
                            asChild
                            variant="transparent"
                            className="text-slate-600 hover:text-slate-800"
                        >
                            <Link href="/" className="flex items-center justify-center">
                                <ArrowLeftMini className="w-4 h-4 mr-2" />
                                Wróć do strony głównej
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-12 bg-slate-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                        Potrzebujesz pomocy?
                    </h3>
                    <div className="space-y-3 text-slate-600">
                        <p>
                            Jeśli problem się powtarza, skontaktuj się z nami:
                        </p>
                        <div className="space-y-2">
                            <p className="flex items-center">
                                <span className="font-medium mr-2">Email:</span>
                                kontakt@lumoria-studio.com
                            </p>
                            <p className="flex items-center">
                                <span className="font-medium mr-2">Telefon:</span>
                                +48 123 456 789
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
