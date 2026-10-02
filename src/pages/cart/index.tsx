import { FaMinus, FaPlus } from "react-icons/fa"
import DsButton from "../../components/design-system/DsButton"
import PageHeader from "../../components/design-system/PageHeader"
import { useCounterStore } from "../../stores/counter.store"
import { FaTrashCan } from "react-icons/fa6"

const Cart = () => {

  const cart = useCounterStore(
    (state) => state.cart
  )

  const count = useCounterStore(
    (state) => state.count
  )

  const increment = useCounterStore(
        (state) => state.increment
    )

    const decrement = useCounterStore(
        (state) => state.decrement
    )

  return (
    <>
      <PageHeader>Shopping Cart:</PageHeader>

      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
        

        <div className="bg-linear-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-md flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="text-sm font-medium text-slate-400 block mb-1">Total Amount</span>
            <h2 className="text-3xl font-extrabold text-emerald-400">
              ${cart.reduce((total, product) => total + (product.price * (count[product.id] || 0)), 0).toFixed(2)}
            </h2>
          </div>
          
          <div className="bg-slate-700/50 backdrop-blur px-4 py-2 rounded-xl border border-slate-600/50">
            <h3 className="text-sm font-semibold text-slate-200">
              Total Quantity: <span className="text-white font-bold">{Object.values(count).reduce((sum, qty) => sum + qty, 0)}</span>
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="w-full text-left text-sm text-gray-700 dark:text-gray-300">
            <thead className="bg-gray-100 dark:bg-gray-800 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4 text-center">Title</th>
                <th className="px-6 py-4 text-center">Category</th>
                <th className="px-6 py-4 text-center">Price</th>
                <th className="px-6 py-4 text-center">Quantity</th>
                <th className="px-6 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
              {cart.map((product) => {
                const itemQty = count[product.id] || 0;
                if (itemQty === 0) return null;

                return (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="w-10 h-10 text-gray-900 dark:text-white">
                      <img src={product.thumbnail} alt={product.title} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white text-center">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-center">
                      ${product.price}
                    </td>

                    <td>


                    <div className="mt-6 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl border border-gray-200 dark:border-gray-700 w-fit mx-auto shadow-inner">
  
                    <DsButton 
                    type="button" 
                    classname="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/40 dark:hover:text-red-400 active:scale-95 transition-all text-lg font-bold select-none cursor-pointer"
                    icon={count[product.id] === 1 ? <FaTrashCan /> : <FaMinus />}
                    onClick={() => decrement(product.id)}
                    />
                    <span className="w-8 text-center font-semibold text-gray-900 dark:text-white text-sm select-none">
                    {itemQty}
                    </span>

  
                    <DsButton 
                    type="button" 
                    classname="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-400 active:scale-95 transition-all text-lg font-bold select-none cursor-pointer"
                    icon={<FaPlus />}
                    onClick={() => increment(product.id)}
                    />

                  </div>
                  </td>
                    <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      ${(product.price * itemQty).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default Cart