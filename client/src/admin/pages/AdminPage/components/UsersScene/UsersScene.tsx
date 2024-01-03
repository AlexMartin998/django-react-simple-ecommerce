/* eslint-disable indent */
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { Loader } from '@/shared/components/ui';
import { getUsers } from '@/store/users';
import { UsersTBody } from '..';

export interface UsersSceneProps {
  results: any;
}

const UsersScene: React.FC<UsersSceneProps> = ({ results }) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isError) return toast.error('Error!');
  if (isLoading) return <Loader />;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3">
              Users ID
            </th>
            <th scope="col" className="px-4 py-3">
              Email
            </th>
            <th scope="col" className="px-4 py-3">
              Name
            </th>
            <th scope="col" className="px-4 py-3">
              Last Name
            </th>
            <th
              scope="col"
              className="px-4 py-3 flex items-center justify-center gap-4"
            >
              Actions
            </th>
          </tr>
        </thead>

        {/* ============ Table Body ============  */}
        <UsersTBody data={data} results={results} />
      </table>
    </div>
  );
};

export default UsersScene;
