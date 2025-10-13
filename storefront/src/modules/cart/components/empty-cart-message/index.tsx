import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-48 px-2 flex flex-col justify-center items-start" data-testid="empty-cart-message">
      <Heading
        level="h1"
        className="flex flex-row text-3xl-regular gap-x-2 items-baseline"
      >
        Cart
      </Heading>
      <Text className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Nie masz jeszcze nic w koszyku. Zacznij przeglądać nasze produkty i
        dodaj coś do koszyka.
      </Text>
      <div>
        <InteractiveLink href="/store">Zobacz produkty</InteractiveLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
