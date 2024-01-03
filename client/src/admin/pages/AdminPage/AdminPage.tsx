import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { searchProduct } from '@/store/products';
import { searchUsers } from '@/store/users';
import { Orders, ProductsScene, UsersScene } from './components';

export interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const [show, setShow] = useState(0);
  const [search, setSearch] = useState('');

  ////* queries
  // TODO: debouncer | set to store result and do not pass results by props, clear store when search input is clean
  // podriamos setear a zustan el result asi no pasar x props a c/1
  const { data } = useQuery({
    queryKey: ['products', search],
    queryFn: async () => {
      //* detecta los cambios del state search y se ejecuta
      if (search && show === 0) {
        // console.log('searching...');
        const res = await searchProduct(search);
        if (!res.products.length) toast.error('Nothing found');
        return res;
      }
      return { products: [] };
    },
  });

  const { data: users } = useQuery({
    queryKey: ['users', search],
    queryFn: async () => {
      if (search && show === 2) {
        const res = await searchUsers(search);
        if (!res.users.length) toast.error('Nothing found');
        return res;
      }
      return { users: [] };
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
            {/* ======= Searcher ======= */}
            <div className="w-full md:w-1/2">
              <form className="flex items-center">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    type="text"
                    id="simple-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>

            {/* ======= Tabs ======= */}
            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
              <button
                onClick={() => setShow(0)}
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Products
              </button>
              <button
                onClick={() => setShow(1)}
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Orders
              </button>
              <button
                onClick={() => setShow(2)}
                type="button"
                className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                Users
              </button>
            </div>
          </div>

          {/* ============ Scenes ============ */}
          {show === 0 && <ProductsScene results={data} />}
          {show === 1 && <Orders />}
          {show === 2 && <UsersScene results={users} />}
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
