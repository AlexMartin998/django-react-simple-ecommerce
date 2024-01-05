import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Loader } from '@/shared/components/ui';
import { OrderResponse } from '@/shared/interfaces';
import { getOrders } from '@/store/cart';
import { OrdersTr } from '.';

export interface OrderSceneProps {
  results?: OrderResponse[];
}

const OrdersScene: React.FC<OrderSceneProps> = ({ results }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

  if (isError) return toast.error('Error!');
  if (isLoading) return <Loader />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Order id
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Delivered at
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Total Price
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Shipping Address
            </th>
          </tr>
        </thead>

        {/* ============ Table Body ============  */}
        <tbody>
          {results?.length ? (
            <OrdersTr data={results} />
          ) : (
            <OrdersTr data={data} />
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersScene;
