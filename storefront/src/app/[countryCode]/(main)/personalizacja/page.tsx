import PersonalizationDetails from "@modules/products/components/personalization-details"
import BackToPrevious from "@modules/common/components/back-to-previous"

type Props = {
    params: { countryCode: string }
}

export default function PersonalizationLocalePage({ params: { countryCode } }: Props) {
    return (
        <main className="content-container py-8">
            <div className="max-w-3xl mx-auto">
                <div className="mb-4">
                    <BackToPrevious label="← Powrót do produktu" />
                </div>
                <PersonalizationDetails />
            </div>
        </main>
    )
}
