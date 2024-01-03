import { InfiniteData } from '@tanstack/react-query';

import { ProductsResponse, ProductsSearchResponse } from '@/shared/interfaces';
import { ProductsTr } from '.';

export type FetchedBodyProps = {
  data: InfiniteData<ProductsResponse> | undefined;
  results?: ProductsSearchResponse;
};

const ProductsTBody: React.FC<FetchedBodyProps> = ({ data, results }) => {
  return (
    <>
      {results?.products?.length ? (
        <tbody>
          <ProductsTr data={results.products} />
        </tbody>
      ) : (
        <>
          {/* throgh each page of infiniteQuery: duplicate tbody */}
          {data?.pages.map((page: any) => (
            <tbody key={page.meta.next}>
              <ProductsTr data={page.data} />
            </tbody>
          ))}
        </>
      )}
    </>
  );
};

export default ProductsTBody;
