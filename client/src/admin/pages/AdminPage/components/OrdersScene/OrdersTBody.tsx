import { OrderResponse, SearchOrdersResponse } from '@/shared/interfaces';
import { OrdersTr } from '.';

export type OrdersTBodyProps = {
  data: OrderResponse[];
  results?: SearchOrdersResponse;
};

const OrdersTBody: React.FC<OrdersTBodyProps> = ({ data, results }) => {
  return (
    <tbody>
      {results?.orders?.length ? (
        <OrdersTr data={results.orders} />
      ) : (
        <>{data?.length && <OrdersTr data={data} />}</>
      )}
    </tbody>
  );
};

export default OrdersTBody;
