import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

import PaginatedProducts from "./paginated-products"
import { listCategories } from "@lib/data/categories"
import CategoriesFilter from "@modules/store/components/refinement-list/categories-filter"

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
        {/* Kategorie w tym samym stylu co "Sortuj według" */}
        <Suspense fallback={null}>
          <CategoriesFilterLoader fetcher={categoriesPromise} countryCode={countryCode} />
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

// Server wrapper that feeds categories to a client filter in the same style as sorting
async function CategoriesFilterLoader({ fetcher, countryCode }: { fetcher: ReturnType<typeof listCategories>, countryCode: string }) {
  const categories = await fetcher
  if (!categories || categories.length === 0) return null

  // No selection on the generic store page
  return <CategoriesFilter categories={categories} countryCode={countryCode} />
}
