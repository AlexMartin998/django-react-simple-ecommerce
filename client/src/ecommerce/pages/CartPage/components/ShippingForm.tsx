import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductCart } from '@/shared/interfaces';
import { useCartStore, useCreateOrderMutation } from '@/store/cart';

export type ShippingFormProps = {
  cart: ProductCart[];
  totalPrice: any;
};

const ShippingForm: React.FC<ShippingFormProps> = ({ cart, totalPrice }) => {
  const navigate = useNavigate();

  ///* Global State
  const clearCart = useCartStore(s => s.clearCart);

  ///* form: TODO: use react-hook-form
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  ///* mutations
  const createOrderMutation = useCreateOrderMutation(navigate, clearCart);

  ///* handlers
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createOrderMutation.mutate({
      // asi lo espera el back
      order_items: cart,
      total_price: totalPrice,
      address: address,
      city: city,
      postal_code: postalCode,
    });
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-8">
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Shipping address
      </h1>

      {/* ====== Form ====== */}
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Address
          </label>
          <input
            onChange={e => setAddress(e.target.value)}
            value={address}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Address"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            City
          </label>
          <input
            onChange={e => setCity(e.target.value)}
            value={city}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="City"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Postal code
          </label>
          <input
            onChange={e => setPostalCode(e.target.value)}
            value={postalCode}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Postal Code"
          />
        </div>

        <button
          type="submit"
          className="flex mx-auto px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        {/* =============== PayPal =============== */}
        <div className="ml-[180px] text-3xl text-white">
          {/* TODO: Paypal */}
          PayPal Btn
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
