import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  access: string;
  refresh: string;
  isAuth: boolean;
};

type Actions = {
  setToken: (access: string, refresh: string) => void;
  logout: () => void;
};

// persist returns a fn(), so we need to invoke it ()()
export const useAuthStore = create<State & Actions>()(
  // persist by default in LocalStorage
  persist(
    set => ({
      ////* state
      access: '',
      refresh: '',
      isAuth: false,

      ////* actions
      setToken(access: string, refresh: string) {
        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
        }));
      },
      logout() {
        set({ access: '', refresh: '', isAuth: false });
      },
    }),

    // cada persist de 1 store requiere su name | x default lo guarda en el LocalStorage
    { name: 'auth' }
  )
);
