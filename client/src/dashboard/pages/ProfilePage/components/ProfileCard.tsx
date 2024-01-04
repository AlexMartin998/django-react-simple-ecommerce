import { Token } from '@/auth/shared/interfaces';
import { useUiStore } from '@/store/ui';

export type ProfileCardProps = {
  decodedToken: Token | null;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ decodedToken }) => {
  const setModalOpen = useUiStore(s => s.setModalOpen);

  return (
    <div className="flex flex-col items-center pb-10">
      <img
        className="pb-5"
        // src={`${VITE_API_URL}/${'avatar'}`}
        src="/avatar-1.jpeg"
        alt="user image"
      />
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
        {decodedToken?.name}
      </h5>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {decodedToken?.email}
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
