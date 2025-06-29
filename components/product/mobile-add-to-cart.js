'use client'

import Spinner from '../ui/Spinner'

export default function MobileAddToCart({ selectedVariant, selectedSellingPlan, isLoading, addToCart }) {
  const handleAddToCart = () => {
    if (selectedVariant && selectedVariant.availableForSale) {
      addToCart(selectedVariant.id, 1, selectedSellingPlan)
    }
  }

  if (!selectedVariant) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white p-4 border-t border-gray-200 shadow-lg md:hidden">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="mr-3">
          <p className="font-medium text-black">
            {selectedVariant.price?.amount ? 
              `$${parseFloat(selectedVariant.price.amount).toFixed(2)}` : 
              'Price unavailable'}
          </p>
        </div>
        <button 
          className="w-full bg-black text-white py-3 px-4 rounded-md font-medium"
          onClick={handleAddToCart}
          disabled={isLoading || !selectedVariant.availableForSale}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Spinner size={5} className="mr-2" />
              Adding...
            </span>
          ) : (
            selectedVariant.availableForSale ? 'Add to Cart' : 'Sold Out'
          )}
        </button>
      </div>
    </div>
  )
}