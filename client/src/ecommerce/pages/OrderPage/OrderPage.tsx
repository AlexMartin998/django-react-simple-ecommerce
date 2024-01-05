import { Navigate, useParams } from 'react-router-dom';

import { Loader } from '@/shared/components/ui';
import { useGetOrderQuery } from '@/store/cart';

export interface OrderPageProps {}

const OrderPage: React.FC<OrderPageProps> = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetOrderQuery(+id!);

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to="/" replace />;

  return (
    <>
      {data?.id && (
        <div className="overflow-x-auto container mx-auto px-4 pt-11">
          <div className="max-w-[81%] mx-auto">
            {/* ============ Order ============ */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Total Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Entregado
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Created at
                  </th>

                  <th scope="col" className="px-4 py-3 hidden md:table-cell">
                    Delivered at
                  </th>

                  <th scope="col" className="px-4 py-3">
                    City
                  </th>

                  <th scope="col" className="px-4 py-3 hidden md:table-cell">
                    Address
                  </th>

                  <th scope="col" className="px-4 py-3 hidden md:table-cell">
                    Zip code
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    $ {data.total_price}
                  </th>

                  <td className="px-4 py-3">
                    {data.is_delivered === false || null ? (
                      <p>No entregado</p>
                    ) : (
                      <p>entregado</p>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {data?.created_at && data.created_at.slice(0, 10)}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {data.delivered_at && data.delivered_at.slice(0, 10)}
                  </td>

                  <td className="px-4 py-3">{data.shipping_address.city}</td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {data.shipping_address.address}
                  </td>

                  <td className="px-4 py-3 hidden md:table-cell">
                    {data.shipping_address.postal_code}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* ============ Order Items ============ */}
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-11 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Quantity
                  </th>

                  <th scope="col" className="px-4 py-3">
                    Price
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.order_items &&
                  data.order_items.map((p: any) => (
                    <tr className="border-b dark:border-gray-700" key={p.id}>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {p.product}
                      </th>

                      <td className="px-4 py-3">{p.quantity}</td>

                      <td className="px-4 py-3">$ {p.price}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPage;
