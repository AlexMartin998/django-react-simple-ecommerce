/* eslint-disable indent */

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProductList } from '@/ecommerce/shared/components';
import { Loader } from '@/shared/components/ui';
import { useInfiniteQueryProducts, useProductsStore } from '@/store/products';
import { useSearchStore } from '@/store/search';

export interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  const searchedProducts = useProductsStore(s => s.searchedProducts);
  const searchTerm = useSearchStore(s => s.searchTerm);
  const isSearching = useSearchStore(s => s.isSearching);

  ////* infinite scroll
  const { ref, inView } = useInView();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQueryProducts();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      {searchTerm.length ? (
        <>
          {isSearching ? (
            <Loader />
          ) : (
            <>
              {searchedProducts.length ? (
                <ProductList products={searchedProducts} />
              ) : (
                <div className="w-full h-screen text-white flex justify-center items-center text-2xl">
                  No results
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {data?.pages.map((page: any) => (
            <div key={page.meta.next}>
              <ProductList products={page.data} />

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
      )}
    </>
  );
};

export default HomePage;
