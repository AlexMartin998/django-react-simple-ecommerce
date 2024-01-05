import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

import { Loader } from '@/shared/components/ui';
import { SearchOrdersResponse } from '@/shared/interfaces';
import { getOrders } from '@/store/cart';
import { OrdersTBody } from '.';

export interface OrderSceneProps {
  results?: SearchOrdersResponse;
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
            <th scope="col" className="px-6 py-3">
              Order id
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Total <br />
              Price
            </th>
            <th scope="col" className="px-4 py-3 hidden md:table-cell">
              Products
            </th>
            <th scope="col" className="px-4 py-3 hidden md:table-cell">
              Shipping <br /> Address
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Created at
            </th>
            <th scope="col" className="px-6 py-3 hidden md:table-cell">
              Delivered at
            </th>
          </tr>
        </thead>

        {/* ============ Table Body ============  */}
        <OrdersTBody data={data} results={results} />
      </table>
    </div>
  );
};

export default OrdersScene;
