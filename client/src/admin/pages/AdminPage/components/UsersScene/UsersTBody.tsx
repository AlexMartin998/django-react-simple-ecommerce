import { User } from '@/shared/interfaces';
import { UsersTr } from '..';

export type UsersTBodyProps = {
  data: User[];
  results?: any;
};

const UsersTBody: React.FC<UsersTBodyProps> = ({ data, results }) => {
  return (
    <tbody>
      {results?.users?.length ? (
        <UsersTr data={results.users} />
      ) : (
        <UsersTr data={data} />
      )}
    </tbody>
  );
};

export default UsersTBody;
