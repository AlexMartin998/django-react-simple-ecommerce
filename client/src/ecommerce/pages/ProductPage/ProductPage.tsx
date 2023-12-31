import { Navigate, useParams } from 'react-router-dom';

import { Loader } from '@/shared/components/ui';
import { getEnvs } from '@/shared/utils';
import { useGetProductBySlugQuery } from '@/store/products';

const { VITE_API_URL } = getEnvs();

export interface ProductPageProps {}

const ProductPage: React.FC<ProductPageProps> = () => {
  const { slug } = useParams();
  const { data, isLoading } = useGetProductBySlugQuery(slug!);

  if (isLoading) return <Loader />;
  if (!data?.id) return <Navigate to="/" replace />;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            {data.name}
            <span className="text-green-300 ml-4">${data.price}</span>
          </h2>

          <p className="mb-4 font-bold">{data.description}</p>

          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to Cart
            <svg
              aria-hidden="true"
              className="w-4 h-4 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </a>
        </div>

        <img
          className="w-full"
          src={`${VITE_API_URL}${data.image}`}
          alt="office content 1"
          draggable={false}
        />
      </div>

      {/* <Reviews productId={data.id} reviews={data.reviews} /> */}
    </div>
  );
};

export default ProductPage;
