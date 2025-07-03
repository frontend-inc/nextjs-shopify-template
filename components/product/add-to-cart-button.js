'use client'

import Spinner from '../../components/ui/Spinner'
import { Button } from '../../components/ui/button'

export default function AddToCartButton({ selectedVariant, selectedSellingPlan, isLoading, addToCart }) {
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id, 1, selectedSellingPlan)
    }
  }

  // Button for desktop view
  const DesktopButton = () => (
    <Button 
      className="w-full mt-8 cursor-pointer hidden md:flex" 
      size="lg"
      onClick={handleAddToCart}
      disabled={isLoading || !selectedVariant}
    >
      {isLoading ? (
        <>
          <Spinner size={5} className="mr-2" />
          Adding...
        </>
      ) : (
        'Add to Cart'
      )}
    </Button>
  )

  // Sticky button for mobile view
  const MobileButton = () => (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white p-4 border-t border-gray-200 shadow-lg md:hidden">
      <Button 
        className="cursor-pointer w-full"
        size="lg"
        onClick={handleAddToCart}
        disabled={isLoading || !selectedVariant}
      >
        {isLoading ? (
          <>
            <Spinner size={5} className="mr-2" />
            Adding...
          </>
        ) : (
          <>
            Add to Cart
            {selectedVariant?.price?.amount && (
              <span className="ml-2 font-semibold">
                ${parseFloat(selectedVariant.price.amount).toFixed(2)}
              </span>
            )}
          </>
        )}
      </Button>
    </div>
  )

  return (
    <>
      <DesktopButton />
      <MobileButton />
    </>
  )
}