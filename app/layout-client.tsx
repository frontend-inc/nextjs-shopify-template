'use client'

import Header from '../components/layout/header'
import Footer from '../components/layout/footer'
import Cart from '../components/cart/cart'
import { Toaster } from '../components/ui/sonner'
import { hasShopifyCredentials } from '../shopify/client'
import ShopifyRequired from '../components/layout/shopify-required'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const shopifyConfigured = hasShopifyCredentials()

  if (!shopifyConfigured) {
    return <ShopifyRequired />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <Cart />
        {children}
        <Toaster />
      </div>
      <Footer />
    </div>
  )
}