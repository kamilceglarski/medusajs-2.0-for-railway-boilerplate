import { notFound } from "next/navigation"
import { Suspense } from "react"

import InteractiveLink from "@modules/common/components/interactive-link"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "@modules/store/templates/paginated-products"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import normalizeHandle from "@lib/util/normalize-handle"
import { HttpTypes } from "@medusajs/types"
import { listCategories } from "@lib/data/categories"
import CategoriesFilter from "@modules/store/components/refinement-list/categories-filter"
import SubcategoriesGrid from "@modules/categories/components/subcategories-grid"

export default function CategoryTemplate({
  categories,
  sortBy,
  page,
  countryCode,
}: {
  categories: HttpTypes.StoreProductCategory[]
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  const category = categories[categories.length - 1]
  const parents = categories.slice(0, categories.length - 1)

  if (!category || !countryCode) notFound()

  const categoriesPromise = listCategories()

  return (
    <div
      className="flex flex-col small:flex-row small:items-start py-6 content-container"
      data-testid="category-container"
    >
      <div className="small:min-w-[250px] small:ml-[1.675rem]">
        <RefinementList sortBy={sort} data-testid="sort-by-container" />
        <Suspense fallback={null}>
          <AllCategoriesFilterLoader fetcher={categoriesPromise} countryCode={countryCode} selectedHandle={category.handle} />
        </Suspense>
      </div>
      <div className="w-full">
        <div className="flex flex-row mb-8 text-2xl-semi gap-4">
          {parents &&
            parents.map((parent) => (
              <span key={parent.id} className="text-ui-fg-subtle">
                <LocalizedClientLink
                  className="mr-4 hover:text-black"
                  href={`/categories/${normalizeHandle(parent.handle || parent.name)}`}
                  data-testid="sort-by-link"
                >
                  {parent.name}
                </LocalizedClientLink>
                /
              </span>
            ))}
          <h1 data-testid="category-page-title">{category.name}</h1>
        </div>
        {category.description && (
          <div className="mb-8 text-base-regular">
            <p>{category.description}</p>
          </div>
        )}
        {category.category_children && category.category_children.length > 0 && (
          <SubcategoriesGrid
            subcategories={category.category_children}
            countryCode={countryCode}
          />
        )}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sort}
            page={pageNumber}
            categoryId={category.id}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

async function AllCategoriesFilterLoader({ fetcher, countryCode, selectedHandle }: { fetcher: ReturnType<typeof listCategories>, countryCode: string, selectedHandle: string }) {
  const categories = await fetcher
  if (!categories || categories.length === 0) return null

  return (
    <CategoriesFilter
      categories={categories}
      countryCode={countryCode}
      selectedHandle={selectedHandle}
    />
  )
}
