'use client'

import { useCart } from '../../context/cart-context'
import { Button } from '../ui/button'

export default function CartButton() {
  const { openCart, cartItemCount } = useCart()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={openCart}
      aria-label="Cart"
      className="relative"
    >
      <i className="ri-shopping-bag-2-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
      {cartItemCount > 0 && (
        <span className={"absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"}>
          {cartItemCount}
        </span>
      )}
    </Button>
  )
}