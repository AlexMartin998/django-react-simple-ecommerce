import { Link } from 'react-router-dom';

import { OrderResponse } from '@/shared/interfaces';
import { useCompleteOrderMutation } from '@/store/cart';

export type OrdersTrProps = {
  data: OrderResponse[];
};

const OrdersTr: React.FC<OrdersTrProps> = ({ data }) => {
  const completeOrderMutation = useCompleteOrderMutation();

  ///* handlers
  const onComplete = (id: number) => {
    if (window.confirm('Are you sure?') === true) {
      completeOrderMutation.mutate(id);
    }
  };

  return (
    <>
      {data.map(order => (
        <tr
          key={order.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-1"
                type="checkbox"
                checked={order.is_delivered}
                onChange={() => onComplete(order.id)}
                // onClick={() => onComplete(order.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-search-1" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {order.id}
          </th>

          <td className="px-6 py-4">{order.created_at.slice(0, 10)}</td>

          <td className="px-6 py-4">
            {order.delivered_at !== null && (
              <>{order.delivered_at.slice(0, 10)}</>
            )}
          </td>

          <td className="px-6 py-4">{order.user}</td>

          <td className="px-6 py-4">$ {order.total_price}</td>

          <td className="px-6 py-4">
            <Link to={`/dashboard/orders/${order.id}`}>See</Link>
          </td>

          <td className="px-6 py-4">
            <Link to={`/dashboard/orders/${order.id}`}>See</Link>
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrdersTr;
