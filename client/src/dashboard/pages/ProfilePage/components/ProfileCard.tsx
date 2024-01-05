import { User } from '@/shared/interfaces';
import { getEnvs } from '@/shared/utils';
import { useUiStore } from '@/store/ui';

const { VITE_API_URL } = getEnvs();

export type ProfileCardProps = {
  user: User;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  const setModalOpen = useUiStore(s => s.setModalOpen);

  return (
    <div className="flex flex-col items-center pb-10">
      <img
        className="pb-5"
        src={`${VITE_API_URL}${user?.avatar}`}
        alt="user image"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {user?.name}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {user?.email}
      </span>

      <div className="flex mt-4 md:mt-6">
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
