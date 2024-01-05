import { Link } from 'react-router-dom';

import { OrderResponse } from '@/shared/interfaces';
import { useCompleteOrderMutation } from '@/store/cart';

export type OrdersTrProps = {
  data: OrderResponse[];
};

const OrdersTr: React.FC<OrdersTrProps> = ({ data }) => {
  const completeOrderMutation = useCompleteOrderMutation();

  ///* handlers
  const onComplete = (order: OrderResponse) => {
    if (order.delivered_at) return;

    if (window.confirm('Are you sure?') === true) {
      completeOrderMutation.mutate(order.id);
    }
  };

  return (
    <>
      {data.map(order => (
        <tr
          key={order.id}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {/* ------ ID ------ */}
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {order.id}
          </th>

          {/* ------ user email ------ */}
          <td className="px-6 py-4">{order.user}</td>

          {/* ------ Total Amount ------ */}
          <td className="px-6 py-4">$ {order.total_price}</td>

          {/* ------ Products - View ------ */}
          <td className="px-4 py-4 text-center hidden md:table-cell">
            <Link to={`/dashboard/orders/${order.id}`}>See</Link>
          </td>

          {/* ------ Address ------ */}
          <td className="px-4 py-4 text-center hidden md:table-cell">
            <Link to={`/dashboard/orders/${order.id}`}>See</Link>
          </td>

          {/* ------ toggle delivery ------ */}
          <td className="px-6 py-4 text-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={order?.delivered_at ? true : false}
                disabled={order?.delivered_at ? true : false}
                onChange={() => onComplete(order)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </td>

          {/* ------ createdAt ------ */}
          <td className="px-6 py-4 hidden md:table-cell">
            {order.created_at.slice(0, 10)}
          </td>

          {/* ------ deliveredAt ------ */}
          <td className="px-6 py-4 hidden md:table-cell">
            {order?.delivered_at?.slice(0, 10)}
          </td>
        </tr>
      ))}
    </>
  );
};

export default OrdersTr;
