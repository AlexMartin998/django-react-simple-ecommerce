import { useParams } from 'react-router-dom';

import { ProductList } from '@/ecommerce/shared/components';
import { Loader } from '@/shared/components/ui';
import { useGetProductsByCategory } from '@/store/products';

export interface CategoryPageProps {}

const CategoryPage: React.FC<CategoryPageProps> = () => {
  const { category } = useParams();

  ///* query
  const { data, isLoading } = useGetProductsByCategory(category!);

  if (isLoading || !data?.length) return <Loader />;

  return <ProductList products={data} />;
};

export default CategoryPage;
