"use client"

import { Button } from "@medusajs/ui"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"

import { useIntersection } from "@lib/hooks/use-in-view"
import Divider from "@modules/common/components/divider"
import OptionSelect from "@modules/products/components/product-actions/option-select"

import MobileActions from "./mobile-actions"
import ProductPrice from "../product-price"
import { addToCart } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import ImageUpload from "../image-upload"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (variantOptions: any) => {
  return variantOptions?.reduce((acc: Record<string, string | undefined>, varopt: any) => {
    if (varopt.option && varopt.value !== null && varopt.value !== undefined) {
      acc[varopt.option.title] = varopt.value
    }
    return acc
  }, {})
}

export default function ProductActions({
  product,
  region,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState<string>("1")
  const [notes, setNotes] = useState<string>("")
  const [customImages, setCustomImages] = useState<string[]>([])

  // Debug function to track customImages changes
  const handleCustomImagesChange = (newImages: string[]) => {
    console.log('🔍 ProductActions: setCustomImages called with:', newImages)
    setCustomImages(newImages)
  }
  const countryCode = useParams().countryCode as string

  // If there is only 1 variant, preselect the options
  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) {
      return
    }

    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  // update the options when a variant is selected
  const setOptionValue = (title: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [title]: value,
    }))
  }

  // check if the selected variant is in stock
  const inStock = useMemo(() => {
    // If we don't manage inventory, we can always add to cart
    if (selectedVariant && !selectedVariant.manage_inventory) {
      return true
    }

    // If we allow back orders on the variant, we can add to cart
    if (selectedVariant?.allow_backorder) {
      return true
    }

    // If there is inventory available, we can add to cart
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    ) {
      return true
    }

    // Otherwise, we can't add to cart
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)

  const inView = useIntersection(actionsRef, "0px")

  // add the selected variant to the cart
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null

    setIsAdding(true)

    const qtyNum = Math.max(
      1,
      Math.min(99, Number.isFinite(parseInt(quantity, 10)) ? parseInt(quantity, 10) : 1)
    )

    console.log('🔍 customImages before addToCart:', customImages)
    console.log('🔍 customImages length:', customImages.length)

    await addToCart({
      variantId: selectedVariant.id,
      quantity: qtyNum,
      countryCode,
      notes: notes?.trim() ? notes.trim() : undefined,
      customImages: customImages.length > 0 ? customImages : undefined,
    })

    setIsAdding(false)
  }

  return (
    <>
      <div className="flex flex-col gap-y-2" ref={actionsRef}>
        <div>
          {(product.variants?.length ?? 0) > 1 && (
            <div className="flex flex-col gap-y-4">
              {(product.options || []).map((option) => {
                return (
                  <div key={option.id}>
                    <OptionSelect
                      option={option}
                      current={options[option.title ?? ""]}
                      updateOption={setOptionValue}
                      title={option.title ?? ""}
                      data-testid="product-options"
                      disabled={!!disabled || isAdding}
                    />
                  </div>
                )
              })}
              <Divider />
            </div>
          )}
        </div>
        {/* Optional notes for engraving / order */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-ui-fg-subtle">Uwagi do zamówienia (opcjonalnie)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Np. treść graweru: Jan Kowalski, data 01.01.2025"
            rows={3}
            className="w-full rounded-md border border-ui-border-base p-3 bg-transparent outline-none resize-y"
          />
        </div>

        {/* Custom images upload for personalized products */}
        <div className="flex flex-col gap-2">
          <ImageUpload
            onImagesChange={handleCustomImagesChange}
            maxImages={3}
            disabled={!!disabled || isAdding}
          />
        </div>

        {/* Quantity selector (left-aligned, with label) */}
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm font-medium text-ui-fg-base">Ilość:</p>
          <div className="flex items-center border border-ui-border-base rounded-md overflow-hidden">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="px-3 py-2 text-ui-fg-subtle hover:text-ui-fg-base disabled:opacity-50"
              onClick={() =>
                setQuantity((q) => {
                  const n = parseInt(q || "1", 10)
                  return String(Math.max(1, n - 1))
                })
              }
              disabled={!!disabled || isAdding}
            >
              −
            </button>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              min={1}
              max={200}
              value={quantity}
              onChange={(e) => {
                const raw = e.target.value
                // Allow empty string while typing
                if (raw === "") {
                  setQuantity("")
                  return
                }
                // Accept only digits
                if (/^\d+$/.test(raw)) {
                  setQuantity(raw)
                }
              }}
              onBlur={() => {
                const n = parseInt(quantity || "1", 10)
                const clamped = Math.max(1, Math.min(99, Number.isNaN(n) ? 1 : n))
                setQuantity(String(clamped))
              }}
              className="w-14 text-center py-2 bg-transparent outline-none"
              disabled={!!disabled || isAdding}
            />
            <button
              type="button"
              aria-label="Increase quantity"
              className="px-3 py-2 text-ui-fg-subtle hover:text-ui-fg-base disabled:opacity-50"
              onClick={() =>
                setQuantity((q) => {
                  const n = parseInt(q || "1", 10)
                  return String(Math.min(99, n + 1))
                })
              }
              disabled={!!disabled || isAdding}
            >
              +
            </button>
          </div>
        </div>


        <ProductPrice product={product} variant={selectedVariant} />

        <Button
          onClick={handleAddToCart}
          disabled={!inStock || !selectedVariant || !!disabled || isAdding}
          variant="primary"
          className="w-full h-10"
          isLoading={isAdding}
          data-testid="add-product-button"
        >
          {!selectedVariant
            ? "Wybierz wariant"
            : !inStock
              ? "Brak w magazynie"
              : "Dodaj do koszyka"}
        </Button>
        <MobileActions
          product={product}
          variant={selectedVariant}
          options={options}
          updateOptions={setOptionValue}
          inStock={inStock}
          handleAddToCart={handleAddToCart}
          isAdding={isAdding}
          show={!inView}
          optionsDisabled={!!disabled || isAdding}
        />
      </div>
    </>
  )
}
