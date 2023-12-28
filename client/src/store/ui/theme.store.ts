import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  darkMode: boolean;
};

type Actions = {
  toggleDarkMode: () => void;
};

export const useDarkMode = create<State & Actions>()(
  persist(
    set => ({
      ////* state
      darkMode: true,

      ////* actions
      toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
    }),

    {
      name: 'theme', // localStorage
    }
  )
);
