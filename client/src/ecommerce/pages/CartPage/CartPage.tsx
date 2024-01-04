import { Link } from 'react-router-dom';

import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { CartTable, ShippingForm } from './components';

export interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => {
  ///* Global State
  const cart = useCartStore(s => s.cart);
  const totalPrice = useCartStore(s => s.totalPrice);
  const isAuth = useAuthStore(s => s.isAuth);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        {/* ================ Cart table ================ */}
        <CartTable cart={cart} totalPrice={totalPrice} />

        {/* ========== Shipping Address ========== */}
        {isAuth && !!cart.length && (
          <ShippingForm cart={cart} totalPrice={totalPrice} />
        )}

        {!cart.length && (
          <div className="flex items-center justify-center pt-6">
            <Link
              to="/"
              className="inline-flex items-center mx-3 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Keep shopping
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
