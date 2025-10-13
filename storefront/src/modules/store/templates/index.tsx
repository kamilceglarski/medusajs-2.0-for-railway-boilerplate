import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { listCategories } from "@lib/data/categories"

const StoreTemplate = ({
  sortBy,
  page,
  countryCode,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const categoriesPromise = listCategories()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="small:min-w-[250px] small:ml-[1.675rem]">
        <RefinementList sortBy={sort} />
        {/* Kategorie pod "Sortuj według" */}
        <Suspense fallback={null}>
          <CategoriesList fetcher={categoriesPromise} countryCode={countryCode} />
        </Suspense>
      </div>
      <div className="w-full">
        <div className="mb-8 text-2xl-semi">
          <h1 data-testid="store-page-title">Wszystkie produkty</h1>
        </div>
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate

// Async server component to render categories
async function CategoriesList({ fetcher, countryCode }: { fetcher: ReturnType<typeof listCategories>, countryCode: string }) {
  const categories = await fetcher
  if (!categories || categories.length === 0) return null

  return (
    <div className="mt-4">
      <h3 className="txt-small-plus text-ui-fg-subtle mb-2">Kategorie</h3>
      <ul className="flex flex-col gap-1">
        {categories.map((cat: any) => (
          <li key={cat.id}>
            <a
              href={`/${countryCode}/categories/${encodeURIComponent(cat.handle)}`}
              className="block py-1 px-0 text-ui-fg-subtle hover:text-ui-fg-base"
            >
              {cat.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
