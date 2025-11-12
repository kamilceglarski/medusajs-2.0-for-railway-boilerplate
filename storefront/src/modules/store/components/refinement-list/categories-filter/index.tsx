"use client"

import { usePathname, useRouter } from "next/navigation"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"
import normalizeHandle from "@lib/util/normalize-handle"

export type CategoryItem = {
  id: string
  name: string
  handle: string
  category_children?: CategoryItem[]
  parent_category_id?: string | null
}

const ALL_VALUE = "__all__"

const CategoriesFilter = ({
  title = "Kategorie",
  categories,
  countryCode,
  selectedHandle,
}: {
  title?: string
  categories: CategoryItem[]
  countryCode: string
  selectedHandle?: string
}) => {
  const router = useRouter()
  const pathname = usePathname()

  // Funkcja do budowania płaskiej listy z hierarchią
  const buildHierarchicalItems = () => {
    const items: { value: string; label: string; indent?: number }[] = [
      { value: ALL_VALUE, label: "Wszystkie produkty" }
    ]

    // Filtruj tylko kategorie główne (bez rodzica)
    const mainCategories = categories.filter(c => !c.parent_category_id)

    mainCategories.forEach((category) => {
      // Dodaj główną kategorię
      items.push({
        value: normalizeHandle(category.handle || category.name),
        label: category.name,
        indent: 0
      })

      // Dodaj podkategorie z wcięciem
      if (category.category_children && category.category_children.length > 0) {
        category.category_children.forEach((subcat) => {
          items.push({
            value: normalizeHandle(subcat.handle || subcat.name),
            label: `  └ ${subcat.name}`,
            indent: 1
          })
        })
      }
    })

    return items
  }

  const items = buildHierarchicalItems()
  const currentValue = selectedHandle ?? ALL_VALUE

  const handleChange = (value: string) => {
    if (value === ALL_VALUE) {
      router.push(`/${countryCode}/store`)
    } else {
      router.push(`/${countryCode}/categories/${encodeURIComponent(value)}`)
    }
  }

  return (
    <div className="flex small:flex-col gap-6 py-4 mb-8 small:px-0 pl-6 small:min-w-[250px] small:ml-[1.675rem]">
      <div>
        <FilterRadioGroup
          title={title}
          items={items}
          value={currentValue}
          handleChange={handleChange}
        />
      </div>
    </div>
  )
}

export default CategoriesFilter
