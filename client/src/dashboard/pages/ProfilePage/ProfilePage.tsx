import { useAuthStore } from '@/store/auth';
import { useUiStore } from '@/store/ui';
import { ProfileCard, ProfileForm } from '.';

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const decodedToken = useAuthStore(s => s.decodedToken);
  const isModalOpen = useUiStore(s => s.isModalOpen);

  return (
    <div className="flex justify-center pt-[6rem]">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isModalOpen ? (
          <ProfileCard decodedToken={decodedToken} />
        ) : (
          <ProfileForm userId={decodedToken!.user_id} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
