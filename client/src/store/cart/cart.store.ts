import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Product, ProductCart } from '@/shared/interfaces';

interface State {
  cart: ProductCart[];
  totalPrice: number;
}

interface Actions {
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  clearCart: () => void;
}

const initialState: State = {
  cart: [],
  totalPrice: 0,
};

export const useCartStore = create(
  persist<State & Actions>(
    (set, get) => ({
      ////* state
      cart: initialState.cart,
      totalPrice: initialState.totalPrice,

      ////* actions
      addToCart: (item: Product) => {
        const cart = get().cart;
        const cartItem = cart.find(itemInCart => itemInCart.id === item.id);

        ///* upd item quantity in cart
        if (cartItem) {
          const updatedCart = cart.map(itemInCart =>
            itemInCart.id === item.id
              ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
              : itemInCart
          );

          return set(state => ({
            cart: updatedCart,
            totalPrice: state.totalPrice + +item.price,
          }));
        }

        ///* add item to cart
        const updatedCart = [
          ...cart,
          // TODO: implemente Mapper (set price as number)
          { ...item, quantity: 1, price: +item.price },
        ];

        set(state => ({
          cart: updatedCart,
          totalPrice: state.totalPrice + +item.price,
        }));
      },
      removeFromCart: (item: Product) => {
        const cart = get().cart;
        const cartItem = cart.find(itemInCart => itemInCart.id === item.id);

        // upd item quantity
        if (cartItem?.quantity && cartItem.quantity > 1) {
          const updatedCart = cart.map(itemInCart =>
            itemInCart.id === item.id
              ? { ...itemInCart, quantity: itemInCart.quantity - 1 }
              : itemInCart
          );

          return set(state => ({
            cart: updatedCart,
            totalPrice: state.totalPrice - +item.price,
          }));
        }

        // remove item
        set(state => ({
          cart: state.cart.filter(itemInCart => itemInCart.id !== item.id),
          totalPrice: state.totalPrice - +item.price,
        }));
      },
      clearCart: () => {
        set({
          cart: [],
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart',
    }
  )
);
