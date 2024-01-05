import jwtDecode from 'jwt-decode';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Token } from '@/auth/shared/interfaces';
import { User } from '@/shared/interfaces';
import { getUser } from '.';

type State = {
  access: string;
  refresh: string;
  isAuth: boolean;
  isAdmin: boolean;
  user: User | null;

  decodedToken: Token | null;
};

type Actions = {
  setToken: (access: string, refresh: string) => Promise<void>;
  logout: () => void;
  setUserLogin: (userId: number | null) => Promise<void>;
  setUser: (user: any) => void;
};

// persist returns a fn(), so we need to invoke it ()()
export const useAuthStore = create<State & Actions>()(
  // persist by default in LocalStorage
  persist(
    (set, get) => ({
      ////* state
      access: '',
      refresh: '',
      isAuth: false,
      isAdmin: false,
      decodedToken: null,
      user: null,

      ////* actions
      // LoginLike
      setToken: async (access: string, refresh: string) => {
        // x como me lo envia Django
        const tokenDecoded: Token = jwtDecode(access);

        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
          isAdmin: (!!access && !!refresh && tokenDecoded.is_staff) || false,
          decodedToken: tokenDecoded,
        }));

        await get().setUserLogin(tokenDecoded.user_id);
      },
      setUserLogin: async (userId: number | null) => {
        if (!userId) return get().logout();

        const user = await getUser(userId ?? 0);
        if (!user?.id) return get().logout();

        set({ user: user });
      },
      setUser(user) {
        set({ user: user });
      },
      logout() {
        set({
          access: '',
          refresh: '',
          isAuth: false,
          isAdmin: false,
          user: null,
        });
      },
    }),

    // cada persist de 1 store requiere su name | x default lo guarda en el LocalStorage
    { name: 'auth' }
  )
);
