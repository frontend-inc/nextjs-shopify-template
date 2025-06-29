'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { client } from '../../../shopify/client'
import { QUERY_PRODUCT_BY_HANDLE } from '../../../graphql/products'
import { useCart } from '../../../context/cart-context'
import Breadcrumbs from '../../../components/layout/breadcrumbs'
import ProductDetails from '../../../components/product/product-details'
import RecommendedProducts from '../../../components/products/recommended-products'

export default function ProductPage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedSellingPlan, setSelectedSellingPlan] = useState(null)
  const params = useParams()
  const handle = params.handle as string
  const { addToCart, isLoading: isCartLoading } = useCart()

  useEffect(() => {
    if (!handle) return

    async function fetchProduct() {
      try {
        setLoading(true)
        
        const { data, errors } = await client.request(QUERY_PRODUCT_BY_HANDLE, {
          variables: {
            handle: handle
          },
        })

        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch product due to GraphQL errors')
          setLoading(false)
          return
        }

        if (!data.productByHandle) {
          setError('Product not found')
          setLoading(false)
          return
        }

        const product = data.productByHandle
        setProduct(product)
        
        if (product.variants.edges.length > 0) {
          const firstVariant = product.variants.edges[0].node
          setSelectedVariant(firstVariant)
          
          const initialOptions = {}
          firstVariant.selectedOptions.forEach(option => {
            initialOptions[option.name] = option.value
          })
          setSelectedOptions(initialOptions)
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to fetch product')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])
  
  const handleOptionChange = (optionName, optionValue) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue
    }
    
    setSelectedOptions(newSelectedOptions)
    
    const matchingVariant = product.variants.edges.find(({ node }) => {
      return node.selectedOptions.every(option => 
        newSelectedOptions[option.name] === option.value
      )
    })
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node)
    }
  }

  return (
    <div className="min-h-screen pt-20 px-8 pb-24 md:pb-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs product={product} />
        
        <ProductDetails 
          product={product}
          loading={loading}
          error={error}
          selectedVariant={selectedVariant}
          selectedOptions={selectedOptions}
          selectedSellingPlan={selectedSellingPlan}
          setSelectedSellingPlan={setSelectedSellingPlan}
          handleOptionChange={handleOptionChange}
          isCartLoading={isCartLoading}
          addToCart={addToCart}
        />
        
        {product?.id && (
          <div className="mt-16 mb-16 md:mb-0">
            <RecommendedProducts productId={product.id} />
          </div>
        )}
      </div>
    </div>
  )
}