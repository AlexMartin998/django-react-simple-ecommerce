import { Link } from 'react-router-dom';

import { Loader } from '@/shared/components/ui';

export type MyOrdersProps = {
  myOrders: any;
  isModalOpen: boolean;
  isLoadingOrders: boolean;
};

const MyOrders: React.FC<MyOrdersProps> = ({
  myOrders,
  isLoadingOrders,
  isModalOpen,
}) => {
  return (
    <>
      {isLoadingOrders ? (
        <Loader />
      ) : myOrders?.length && !isModalOpen ? (
        <div className="overflow-x-auto w-full max-w-sm">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-4 py-3">
                  Order
                </th>
              </tr>
            </thead>

            <tbody>
              {myOrders.map((order: any) => (
                <tr className="border-b dark:border-gray-700" key={order.id}>
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {order.id}
                  </th>
                  <td className="px-4 py-3">
                    <Link
                      to={`/order/${order.id}/`}
                      className="p-2 cursor-pointer rounded-lg bg-gray-900 hover:bg-gray-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </>
  );
};

export default MyOrders;
