import { useRef, useState } from 'react';

import { useProductsStore } from '@/store/products/products.store';
import { useSearchStore } from '@/store/search';

export type ProductSearcherProps = {};

const ProductSearcher: React.FC<ProductSearcherProps> = () => {
  const [pristine, setPristine] = useState(true);

  const setIsLoading = useSearchStore(s => s.setIsSearching);
  const setSearchTerm = useSearchStore(s => s.setSearchTerm); // render searched elements

  const searchProducts = useProductsStore(s => s.searchProducts);

  ///* debouncer
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  ////* handlers
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value) return setSearchTerm(''); // unmount searched elements

    // debounce
    if (timerRef) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (pristine) setPristine(false);
      setIsLoading(true);
      setSearchTerm(value);

      // console.log('Searching...');
      await searchProducts(value);

      setIsLoading(false);
    }, 610);
  };

  return (
    <>
      <input
        type="text"
        onChange={onChangeHandler}
        className="block w-full md:w-[200px] lg:w-[400px] xl:w-[600px] p-2
                  pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
                  bg-gray-50 dark:bg-gray-700 outline-none
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  "
        placeholder="Search..."
      />
    </>
  );
};

export default ProductSearcher;
