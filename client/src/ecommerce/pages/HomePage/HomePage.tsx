/* eslint-disable indent */

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductCard } from '@/ecommerce/shared/components';
import { Loader } from '@/shared/components/ui';
import { Product } from '@/shared/interfaces';
import { useInfiniteQueryProducts } from '@/store/products';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const { ref, inView } = useInView();

  ////* infinite scroll
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQueryProducts();

  ////* effects
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {data?.pages.map((page: any) => (
        <div key={page.meta.next}>
          <div className="flex justify-center">
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-16">
              {page.data.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {!isLoading &&
            data?.pages?.length !== undefined &&
            data.pages.length > 0 &&
            hasNextPage && (
              <div ref={ref}>
                {isLoading || isFetchingNextPage ? <Loader /> : <></>}
              </div>
            )}
        </div>
      ))}
    </>
  );
};

export default HomePage;
