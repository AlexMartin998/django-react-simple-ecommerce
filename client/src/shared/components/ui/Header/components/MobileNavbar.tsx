import { Disclosure } from '@headlessui/react';
import { Link } from 'react-router-dom';

import { ProductSearcher } from '.';

export type MobileNavbarProps = {
  isAuth: boolean;
  isAdmin: boolean;
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({ isAdmin, isAuth }) => {
  return (
    <Disclosure.Panel className="sm:hidden">
      {/* ===== Searcher ===== */}
      <div className="flex mx-2">
        <div className="absolute inset-y-[72px] left-2 px-4 flex pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Search icon</span>
        </div>

        <ProductSearcher />
        {/* <input
          type="text"
          id="search-navbar"
          className="block w-full p-2
        pl-10 text-sm text-gray-900 border border-gray-300 rounded-full 
        bg-gray-50 dark:bg-gray-700 outline-none
        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  
        "
          placeholder="Search..."
        /> */}
      </div>

      {/* ===== Navbar ===== */}
      <div className="space-y-1 px-2 pb-3 pt-2">
        {isAuth ? (
          <div className="w-full grid grid-cols-1">
            <Link
              to={'/'}
              className="bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white"
            >
              Home
            </Link>

            <Link
              to={'/categories'}
              className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Categories
            </Link>
          </div>
        ) : (
          <div className="w-full grid grid-cols-1">
            <Link
              to={'/auth/login'}
              className="bg-slate-400 p-2 px-4 rounded-lg text-black dark:bg-gray-900 dark:text-white"
            >
              Log in
            </Link>

            <Link
              to={'/auth/register'}
              className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Sign up
            </Link>
          </div>
        )}

        {isAuth && isAdmin && (
          <div className="w-full">
            <Link
              to={'/'}
              className="text-black p-2 px-4 rounded-lg hover:bg-slate-400 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </Disclosure.Panel>
  );
};

export default MobileNavbar;
