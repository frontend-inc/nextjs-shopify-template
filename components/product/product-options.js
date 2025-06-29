'use client'

import { cn } from '../../lib/utils'

export default function ProductOptions({ options, selectedOptions, handleOptionChange, product }) {
  // Skip rendering if there are no options or only the default option
  if (!options || options.length === 0 || !product) {
    return null
  }

  // Function to find variant by option value (used for color images)
  const findVariantByOption = (optionName, optionValue) => {
    if (!product.variants?.edges) return null
    
    return product.variants.edges.find(({ node }) => 
      node.selectedOptions.some(option => 
        option.name === optionName && option.value === optionValue
      )
    )?.node
  }

  return (
    <div className="space-y-6 mt-6">
      {options.map((option) => {
        // Skip options with just "Default Title" as the only value
        if (option.values.length === 1 && option.values[0] === "Default Title") {
          return null
        }
        
        return (
          <div key={option.id} className="space-y-2">
            <div className="font-medium">{option.name}</div>
            
            {option.name.toLowerCase() === 'color' ? (
              // Color selector with variant thumbnails
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value
                  const variant = findVariantByOption(option.name, value)
                  
                  return (
                    <button
                      key={value}
                      className={cn(
                        'cursor-pointer min-w-[80px] min-h-[80px] w-20 h-20 rounded-lg overflow-hidden',
                        isSelected 
                          ? 'ring-1 ring-black border border-black' 
                          : 'border border-gray-200'
                      )}
                      onClick={() => handleOptionChange(option.name, value)}
                      title={value}
                      aria-label={`${option.name}: ${value}`}
                    >
                      {variant?.image ? (
                        <img 
                          src={variant.image.url} 
                          alt={`${value} variant`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-sm text-gray-600">{value}</span>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            ) : (
              // Regular option selector
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value
                  
                  return (
                    <button
                      key={value}
                      className={cn(
                        'px-3 py-1.5 border rounded',
                        isSelected
                          ? 'bg-gray-200 border-black text-black'
                          : 'border-gray-300 hover:border-gray-400'
                      )}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}