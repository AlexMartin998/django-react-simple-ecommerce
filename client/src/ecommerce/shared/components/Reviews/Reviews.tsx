import { useNavigate } from 'react-router-dom';

import { getEnvs } from '@/shared/utils';
import { useAuthStore } from '@/store/auth';
import { useUiStore } from '@/store/ui';
import { Rating, ReviewModal } from '..';

const { VITE_API_URL } = getEnvs();

export interface ReviewsProps {
  productId: number;
  reviews: any[];
}

const Reviews: React.FC<ReviewsProps> = ({ productId, reviews }) => {
  const setModalOpen = useUiStore(s => s.setModalOpen);
  const isOpen = useUiStore(s => s.isModalOpen);
  const isAuth = useAuthStore(s => s.isAuth);

  const navigate = useNavigate();

  ///* handlers
  const onAddReview = () => {
    if (!isAuth) return navigate('/auth/login');
    setModalOpen(true);
  };

  return (
    <>
      {/* =============== Reviews Header =============== */}
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Reviews of Arch Linux
            </h2>

            <p className="mb-8 font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
              Explore the reivews of this product
            </p>

            {/* ======== open modal btn ======== */}
            <button
              onClick={onAddReview}
              className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create a review
            </button>
          </div>
        </div>
      </section>

      {/* =============== Reviews =============== */}
      {reviews?.map((review: any) => (
        <article className="container mx-auto" key={review.id}>
          <div className="flex items-center mb-4 space-x-4">
            <img
              className="w-10 h-10 rounded-full"
              src={`${VITE_API_URL}${review.avatar}`}
              alt="avatar"
            />
            <div className="space-y-1 font-medium dark:text-white">
              <p>{review.user}</p>
            </div>
          </div>

          <Rating value={review.rating} />

          <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
            <p>{review.created_at?.slice(0, 10)}</p>
          </footer>
          <p className="mb-2 text-gray-500 dark:text-gray-400">
            {review.description}
          </p>
        </article>
      ))}

      {/* =============== modal =============== */}
      {isOpen && <ReviewModal productId={productId} />}
    </>
  );
};

export default Reviews;
