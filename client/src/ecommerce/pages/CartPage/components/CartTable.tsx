import { ProductCart } from '@/shared/interfaces';
import { getEnvs } from '@/shared/utils';
import { useCartStore } from '@/store/cart';

const { VITE_API_URL } = getEnvs();

export type CartTableProps = {
  cart: ProductCart[];
  totalPrice: any;
};

const CartTable: React.FC<CartTableProps> = ({ cart, totalPrice }) => {
  ///* Global State
  const removeFromCart = useCartStore(s => s.removeFromCart);
  const addToCart = useCartStore(s => s.addToCart);

  return (
    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
      <div className="relative mt-5 overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
        {/* ============ Header ============ */}
        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <div className="flex items-center flex-1 space-x-4">
            <h5>
              <span className="text-gray-300 text-xl font-bold">
                Products in you cart: {cart.length}
              </span>
            </h5>
            <h5>
              <span className="text-gray-300 text-xl font-bold">
                Total: {totalPrice === null && '0'} $ {totalPrice}
              </span>
            </h5>
          </div>
        </div>

        {/* ============ Table ============ */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Product
                </th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-4 py-3">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 hidden md:table-cell">
                  Total
                </th>
              </tr>
            </thead>

            {/* ========= TBody ========= */}
            <tbody>
              {cart.map(product => (
                <tr
                  key={product.id}
                  className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <th
                    scope="row"
                    className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="rounded-t-lg h-16"
                      src={`${VITE_API_URL}${product.image}`}
                      alt={`${product.name}`}
                      draggable={false}
                    />

                    {product.name}
                  </th>

                  <td className="px-4 py-2 hidden md:table-cell">
                    <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                      {product.category}
                    </span>
                  </td>

                  {/* ------ Counter ------ */}
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => removeFromCart(product as any)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>

                      <div>
                        {product.quantity}
                        <input
                          type="number"
                          id="first_product"
                          className="hidden bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="1"
                          required
                        />
                      </div>

                      <button
                        onClick={() => addToCart(product as any)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${product.price}
                  </td>

                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden md:table-cell">
                    ${' '}
                    {product.quantity !== undefined
                      ? product.price * product.quantity
                      : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
