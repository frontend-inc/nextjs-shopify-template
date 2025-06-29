'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { client } from '../../../shopify/client'
import { QUERY_COLLECTION_BY_HANDLE } from '../../../graphql/collections'
import { CollectionDetails } from '../../../components/collection'
import Spinner from '../../../components/ui/Spinner'

export default function CollectionPage() {
  const [collection, setCollection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const params = useParams()
  const handle = params.handle as string

  useEffect(() => {
    if (!handle) return

    async function fetchCollection() {
      try {
        setLoading(true)
        
        const { data, errors } = await client.request(QUERY_COLLECTION_BY_HANDLE, {
          variables: {
            handle: handle,
            first: 24,
            sortKey: 'BEST_SELLING',
            reverse: false
          },
        })

        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch collection due to GraphQL errors')
          setLoading(false)
          return
        }

        if (!data.collectionByHandle) {
          setError('Collection not found')
          setLoading(false)
          return
        }

        setCollection(data.collectionByHandle)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching collection:', err)
        setError('Failed to fetch collection')
        setLoading(false)
      }
    }

    fetchCollection()
  }, [handle])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size={8} className="text-black" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-500">{error}</div>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-500">Collection not found</div>
      </div>
    )
  }

  return <CollectionDetails collection={collection} />
}