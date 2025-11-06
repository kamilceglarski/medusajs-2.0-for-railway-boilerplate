import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SubcategoriesGridProps = {
    subcategories: HttpTypes.StoreProductCategory[]
    countryCode: string
}

export default function SubcategoriesGrid({
    subcategories,
    countryCode,
}: SubcategoriesGridProps) {
    if (!subcategories || subcategories.length === 0) {
        return null
    }

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-ui-fg-base">
                Podkategorie
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {subcategories.map((subcategory) => (
                    <LocalizedClientLink
                        key={subcategory.id}
                        href={`/categories/${subcategory.handle}`}
                        className="group"
                    >
                        <div className="border border-ui-border-base rounded-lg p-6 hover:shadow-lg hover:border-[#0E3E4D] transition-all duration-300 h-full">
                            <div className="flex flex-col h-full">
                                <h3 className="text-lg font-medium text-ui-fg-base group-hover:text-[#0E3E4D] transition-colors">
                                    {subcategory.name}
                                </h3>
                                {subcategory.description && (
                                    <p className="mt-2 text-sm text-ui-fg-subtle line-clamp-2">
                                        {subcategory.description}
                                    </p>
                                )}
                                <div className="mt-auto pt-4">
                                    <span className="text-sm text-[#B57641] group-hover:underline font-medium">
                                        Zobacz produkty →
                                    </span>
                                </div>
                            </div>
                        </div>
                    </LocalizedClientLink>
                ))}
            </div>
        </div>
    )
}
