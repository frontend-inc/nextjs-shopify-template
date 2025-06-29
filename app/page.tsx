import ProductsList from '../components/products/products-list'
import CollectionsSlideshow from '../components/collections/collections-slideshow'

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <section className="w-full">
        <CollectionsSlideshow />
      </section>
      
      <main className="max-w-7xl mx-auto p-8 pb-20">
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
          <ProductsList />
        </div>          
      </main>  
    </div>
  )
}