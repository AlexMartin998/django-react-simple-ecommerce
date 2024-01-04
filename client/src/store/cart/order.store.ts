import { create } from 'zustand';

interface State {
  isPaying: boolean;
}

interface Actions {
  setIsPaying: (value: boolean) => void;
}

export const useOrderStore = create<State & Actions>(set => ({
  isPaying: false,

  setIsPaying(value) {
    set({
      isPaying: value,
    });
  },
}));
