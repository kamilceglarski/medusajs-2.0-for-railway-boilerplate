import { sdk } from "@lib/config"
import { cache } from "react"

export const listCategories = cache(async function () {
  // Ensure we fetch enough categories to avoid pagination issues
  return sdk.store.category
    .list(
      { fields: "+category_children,+parent_category_id", limit: 1000, offset: 0 },
      { next: { tags: ["categories"] } }
    )
    .then(({ product_categories }) => product_categories)
})

export const getCategoriesList = cache(async function (
  offset: number = 0,
  limit: number = 100
) {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { limit, offset },
    { next: { tags: ["categories"] } }
  )
})

export const getCategoryByHandle = cache(async function (
  categoryHandle: string[]
) {
  // Try lookup by the provided handle(s) first. If nothing is returned,
  // try again using an ASCII-normalized slug for each handle segment.
  // This allows category names with Polish diacritics to display correctly
  // while resolving pages via ASCII-only handles.

  // helper: simple ascii-normalizer (no dependency)
  const normalizeHandle = (s: string) =>
    s
      .normalize("NFD") // decompose diacritics
      .replace(/[\u0300-\u036f]/g, "") // remove diacritic combining marks
      .replace(/[^\w\s-]/g, "") // remove any non-word/space/hyphen
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase();

  // First attempt: exact handles
  const exact = await sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ["categories"] } }
  );

  if (exact && exact.product_categories && exact.product_categories.length) {
    return exact;
  }

  // Fallback: try normalized handles
  const normalizedHandles = categoryHandle.map((h) => normalizeHandle(h));

  const normalizedResult = await sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: normalizedHandles },
    { next: { tags: ["categories"] } }
  );

  if (normalizedResult && normalizedResult.product_categories && normalizedResult.product_categories.length) {
    return normalizedResult
  }

  // Final fallback: scan all categories and try to match each URL segment by normalized form
  try {
    const all = await listCategories()
    if (all && all.length) {
      const mappedHandles = categoryHandle
        .map((seg) => {
          const normSeg = normalizeHandle(seg)
          const found = all.find((cat: any) => normalizeHandle(cat.handle || cat.name) === normSeg)
          return found ? (found.handle || normalizeHandle(found.name)) : null
        })
        .filter(Boolean) as string[]

      if (mappedHandles.length) {
        const finalResult = await sdk.store.category.list(
          // @ts-ignore
          { handle: mappedHandles },
          { next: { tags: ["categories"] } }
        )

        if (finalResult && finalResult.product_categories && finalResult.product_categories.length) {
          return finalResult
        }
      }
    }
  } catch (err) {
    // ignore and fall through to returning empty
    // console.error("Category fallback scan failed", err)
  }

  // Nothing found
  return { product_categories: [] }
})


