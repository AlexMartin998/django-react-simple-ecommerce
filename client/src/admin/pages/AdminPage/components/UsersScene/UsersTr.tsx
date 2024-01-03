import { BsFillTrashFill } from 'react-icons/bs';

import { User } from '@/shared/interfaces';
import { useUserDeleteMutation } from '@/store/users';

export type UsersTrProps = { data: User[] };

const UsersTr: React.FC<UsersTrProps> = ({ data }) => {
  const deleteUserMutation = useUserDeleteMutation();

  ///* handlers
  const onDelete = (id: number) => {
    if (window.confirm('Are you sure?') === true) {
      deleteUserMutation.mutate(id);
    }
  };

  return (
    <>
      {data.map((user: User) => (
        <tr className="border-b dark:border-gray-700" key={user.id}>
          <th
            scope="row"
            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {user.id}
          </th>
          <td className="px-4 py-3">{user.email}</td>
          <td className="px-4 py-3">{user.name}</td>
          <td className="px-4 py-3">{user.last_name}</td>
          <td className="px-4 py-3 flex items-center justify-center gap-4">
            <BsFillTrashFill
              onClick={() => onDelete(user.id!)}
              size={22}
              className="text-red-300 cursor-pointer"
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default UsersTr;
