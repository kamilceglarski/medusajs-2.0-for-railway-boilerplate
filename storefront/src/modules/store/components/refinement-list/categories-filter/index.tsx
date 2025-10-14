"use client"

import { usePathname, useRouter } from "next/navigation"
import FilterRadioGroup from "@modules/common/components/filter-radio-group"

export type CategoryItem = { id: string; name: string; handle: string }

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

  const items = [
    { value: ALL_VALUE, label: "Wszystkie produkty" },
    ...categories.map((c) => ({ value: c.handle, label: c.name })),
  ]

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
