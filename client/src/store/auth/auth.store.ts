import jwtDecode from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Token } from '@/auth/shared/interfaces';

type State = {
  access: string;
  refresh: string;
  isAuth: boolean;
  isAdmin: boolean;

  decodedToken: Token | null;
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
      isAdmin: false,
      decodedToken: null,

      ////* actions
      // LoginLike
      setToken(access: string, refresh: string) {
        // x como me lo envia Django
        const tokenDecoded: Token = jwtDecode(access);

        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
          isAdmin: (!!access && !!refresh && tokenDecoded.is_staff) || false,
          decodedToken: tokenDecoded,
        }));
      },
      logout() {
        set({ access: '', refresh: '', isAuth: false, isAdmin: false });
      },
    }),

    // cada persist de 1 store requiere su name | x default lo guarda en el LocalStorage
    { name: 'auth' }
  )
);
