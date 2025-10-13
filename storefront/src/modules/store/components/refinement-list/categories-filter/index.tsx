"use client"

import { usePathname, useRouter } from "next/navigation"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type CategoryItem = { id: string; name: string; handle: string }

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

  const items = categories.map((c) => ({ value: c.handle, label: c.name }))

  const handleChange = (value: string) => {
    // Navigate to the selected category page
    router.push(`/${countryCode}/categories/${encodeURIComponent(value)}`)
  }

  return (
    <div className="mt-2">
      <FilterRadioGroup
        title={title}
        items={items}
        value={selectedHandle}
        handleChange={handleChange}
      />
    </div>
  )
}

export default CategoriesFilter