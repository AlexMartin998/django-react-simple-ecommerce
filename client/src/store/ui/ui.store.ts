import { create } from 'zustand';

type State = {
  isModalOpen: boolean;
};

type Actions = {
  setModalOpen: (value: boolean) => void;
};

export const useUiStore = create<State & Actions>(set => ({
  isModalOpen: false,

  setModalOpen(value) {
    set({ isModalOpen: value });
  },
}));
