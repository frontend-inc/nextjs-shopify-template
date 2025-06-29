'use client'

import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import AuthModal from '../auth/auth-modal'
import CartButton from '../cart/cart-button'
import AuthButton from '../auth/auth-button'

export default function Header() {
  const router = useRouter()

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 xl:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900">
              Logo
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/search')}
              aria-label="Search"
            >
              <i className="ri-search-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
            </Button>

            {/* Auth Button Component */}
            <AuthButton />

            {/* Cart Button Component */}
            <CartButton />
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal />
    </header>
  )
}