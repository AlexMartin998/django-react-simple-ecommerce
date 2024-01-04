import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductCart } from '@/shared/interfaces';
import { getEnvs } from '@/shared/utils';
import {
  useCartStore,
  useCreateOrderMutation,
  useOrderStore,
} from '@/store/cart';

const { PAYPAL_CLIENT_ID } = getEnvs();

export type ShippingFormProps = {
  cart: ProductCart[];
  totalPrice: any;
};

const ShippingForm: React.FC<ShippingFormProps> = ({ cart, totalPrice }) => {
  const navigate = useNavigate();

  ///* Global State
  const clearCart = useCartStore(s => s.clearCart);
  const isPaying = useOrderStore(s => s.isPaying);

  ///* form: TODO: use react-hook-form
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  ///* mutations
  const createOrderMutation = useCreateOrderMutation(navigate, clearCart);

  ///* handlers
  const handleSubmit = () => {
    // TODO: fix empy city,address,postalCode
    createOrderMutation.mutate({
      // asi lo espera el back
      order_items: cart,
      total_price: totalPrice,
      address,
      city,
      postal_code: postalCode,
    });
  };

  ///* PayPal
  const createOrder = (_data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice, // zustand
          },
        },
      ],
      // no envios
      application_context: {
        shipping_preference: 'NO_SHIPPING',
      },
    });
  };
  const onApprove = (_data: any, actions: any) => {
    return actions.order.capture(handleSubmit());
  };

  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8 mt-8">
      <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Shipping address
      </h1>

      {/* ====== Form ====== */}
      <form className="space-y-4 md:space-y-6">
        {/* --- Address --- */}
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

        {/* --- City --- */}
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

        {/* --- Postal Code --- */}
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

        {/* =============== PayPal =============== */}
        <div className="ml-[180px]">
          {!isPaying ? (
            <PayPalScriptProvider
              options={{
                clientId: `${PAYPAL_CLIENT_ID || ''}`,
              }}
            >
              <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
                style={{ layout: 'horizontal' }} // just btn without debitcard
              />
            </PayPalScriptProvider>
          ) : (
            <p>Processing...</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
