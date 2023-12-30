/* eslint-disable indent */

import { useEffect } from 'react';
import { AiFillPlusSquare } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

import { Loader } from '@/shared/components/ui';
import { useInfiniteQueryProducts } from '@/store/products';
import { ProductsTBody } from '.';

export type ProductsProps = {
  results: any;
};

const ProductsScene: React.FC<ProductsProps> = ({ results }) => {
  // infinite scroll
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    // error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQueryProducts();

  ////* effects
  // infinite scroll
  useEffect(() => {
    inView && fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Product ID
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Count in stock
            </th>

            <th scope="col" className="px-4 py-3 flex justify-center gap-4">
              Actions
              <Link to="/products/new">
                <AiFillPlusSquare
                  size={22}
                  className="text-green-300 cursor-pointer"
                />
              </Link>
            </th>
          </tr>
        </thead>

        {/* ============ Table Body ============  */}
        <ProductsTBody data={data} results={results} />

        {!isLoading && data?.pages.length === 0 && (
          <p className="text-xl text-slate-800 dark:text-slate-200">
            No more results
          </p>
        )}
      </table>

      {!isLoading &&
        data?.pages?.length !== undefined &&
        data.pages.length > 0 &&
        hasNextPage && (
          <div ref={ref}>
            {isLoading || isFetchingNextPage ? <Loader /> : null}
          </div>
        )}
    </div>
  );
};

export default ProductsScene;
