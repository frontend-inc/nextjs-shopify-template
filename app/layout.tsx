import { Metadata } from 'next'
import Script from 'next/script'
import Head from 'next/head'
import { AuthProvider } from '../context/auth-context'
import { CartProvider } from '../context/cart-context'
import LayoutClient from './layout-client'
import 'react-medium-image-zoom/dist/styles.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Next.js Shopify Store',
  description: 'A modern e-commerce store built with Next.js and Shopify',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/remixicon/4.6.0/remixicon.min.css"
        />
      </Head>
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            <LayoutClient>
              {children}
            </LayoutClient>
          </CartProvider>
        </AuthProvider>
        <Script src="/frontend.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}