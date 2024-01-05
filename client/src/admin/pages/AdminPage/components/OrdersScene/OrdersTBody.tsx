import { OrderResponse } from '@/shared/interfaces';
import { OrdersTr } from '.';

export type OrdersTBodyProps = {
  data: OrderResponse[];
  results?: any;
};

const OrdersTBody: React.FC<OrdersTBodyProps> = ({ data, results }) => {
  return (
    <tbody>
      {results.length ? <OrdersTr data={results} /> : <OrdersTr data={data} />}
    </tbody>
  );
};

export default OrdersTBody;
