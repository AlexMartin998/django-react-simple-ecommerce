import { useAuthStore } from '@/store/auth';
import { useGetMyOrders } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { MyOrders, ProfileCard, ProfileForm } from '.';

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const decodedToken = useAuthStore(s => s.decodedToken);
  const isModalOpen = useUiStore(s => s.isModalOpen);

  const { data, isLoading: isLoadingOrders } = useGetMyOrders();

  return (
    <div className="flex flex-col justify-center items-center pt-[6rem] gap-7">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isModalOpen ? (
          <ProfileCard decodedToken={decodedToken} />
        ) : (
          <ProfileForm userId={decodedToken!.user_id} />
        )}
      </div>

      {/* ========= My Orders ========= */}
      <MyOrders
        myOrders={data}
        isModalOpen={isModalOpen}
        isLoadingOrders={isLoadingOrders}
      />
    </div>
  );
};

export default ProfilePage;
