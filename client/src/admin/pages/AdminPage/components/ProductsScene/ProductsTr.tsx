import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { Product } from '@/shared/interfaces';
import { useProductDeleteMutation } from '@/store/products';

export type ProductsTrProps = {
  data: Product[];
};

const ProductsTr: React.FC<ProductsTrProps> = ({ data }) => {
  const deleteProductMutation = useProductDeleteMutation();

  const onDelete = (product: Product) => {
    if (window.confirm('Are you sure?') === true)
      product?.id && deleteProductMutation.mutate(product.id);
  };

  return (
    <>
      {data.map((product: Product) => (
        <tr key={product.id} className="border-b dark:border-gray-700">
          <td
            scope="row"
            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {product.id}
          </td>
          <td className="px-4 py-3">{product.name}</td>
          <td className="px-4 py-3">$ {product.price}</td>
          <td className="px-4 py-3">{product.count_in_stock}</td>

          <td className="px-4 py-3">
            <div className="flex justify-center gap-4">
              <BsFillTrashFill
                onClick={() => onDelete(product)}
                size={22}
                className="text-red-300 cursor-pointer"
              />

              <Link to={`/admin/products/edit/${product.id}`}>
                <AiFillEdit size={22} className="text-white cursor-pointer" />
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductsTr;
