import { FaMinus, FaPlus } from "react-icons/fa"
import DsButton from "../../../components/design-system/DsButton"
import { useCounterStore } from "../components/../../../stores/counter.store"
import type { Product } from "../../../stores/products.store"

type ProductRowProps = {
    product: Product
    index: number
}

const ProductRow = ({ product, index }: ProductRowProps) => {

    const count = useCounterStore(
        (state) => state.count[product.id] || 0
    )

    const addToCart = useCounterStore(
        (state) => state.addToCart
    )

    const increment = useCounterStore(
        (state) => state.increment
    )

    const decrement = useCounterStore(
        (state) => state.decrement
    )
 
    return (
  <figure
    key={product.id}
    className="flex flex-col dark:bg-linear-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900/80 bg-linear-to-br from-white via-slate-50 to-blue-50/40 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full"
  >
    <img
      src={product.thumbnail}
      alt={product.title}
      className="w-full h-56 object-cover object-center bg-gray-50"
    />
    
    <figcaption className="flex flex-col p-5 gap-3 grow">
      <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-200 uppercase tracking-wider">
        Row: {index + 1}
      </h2>

      <span className="flex justify-between items-start gap-2">
        <span className="text-gray-500 dark:text-gray-200 text-sm mt-1">Title:</span>
        <span className="text-gray-900 dark:text-gray-400 font-bold text-base text-right leading-tight">
          {product.title}
        </span>
      </span>

      <span className="flex justify-between items-center gap-2">
        <span className="text-gray-500 dark:text-gray-200 text-sm">Price:</span>
        <span className="text-emerald-600 font-extrabold text-lg">
          {product.price}
        </span>
      </span>

      <span className="flex justify-between items-center gap-2">
        <span className="text-gray-500 dark:text-gray-200 text-sm">Category:</span>
        <span className="bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md text-xs font-medium">
          {product.category}
        </span>
      </span>
    </figcaption>

    
    <div className="p-5 pt-0 mt-auto">
      {count === 0 ? (
        <DsButton
          color="blue"
          classname="w-full py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex justify-center items-center"
          size="md"
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </DsButton>
      ) : (
        <div className="flex justify-between items-center bg-gray-50 p-1.5 rounded-xl border border-gray-200">
          <DsButton
            color="blue"
            classname="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 flex justify-center items-center"
            size="md"
            icon={<FaMinus />}
            onClick={() => decrement(product.id)}
          />

          <p className="text-lg font-bold text-gray-800 w-10 text-center">
            {count}
          </p>

          <DsButton
            color="blue"
            classname="p-2 rounded-lg hover:bg-gray-200 transition-colors text-gray-700 flex justify-center items-center"
            size="md"
            icon={<FaPlus />}
            onClick={() => increment(product.id)}
          />
        </div>
      )}
    </div>
  </figure>
       )    
}

export default ProductRow