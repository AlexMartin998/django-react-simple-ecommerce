import { Navigate } from 'react-router-dom';

import { Loader } from '@/shared/components/ui';
import { useAuthStore, useGetUserQuery } from '@/store/auth';
import { useGetMyOrders } from '@/store/cart';
import { useUiStore } from '@/store/ui';
import { MyOrders, ProfileCard, ProfileForm } from '.';

export interface ProfilePageProps {}

const ProfilePage: React.FC<ProfilePageProps> = () => {
  const decodedToken = useAuthStore(s => s.decodedToken);
  const user = useAuthStore(s => s.user);
  const isModalOpen = useUiStore(s => s.isModalOpen);

  ////* query
  const { isLoading, isError } = useGetUserQuery(decodedToken?.user_id ?? 0);
  const { data: myOrders, isLoading: isLoadingOrders } = useGetMyOrders();

  if (isLoading) return <Loader />;
  if (isError) return <Navigate to="/" />;

  return (
    <div className="flex flex-col justify-center items-center pt-[6rem] gap-7">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {!isModalOpen ? (
          <ProfileCard user={user!} />
        ) : (
          <ProfileForm user={user!} />
        )}
      </div>

      {/* ========= My Orders ========= */}
      <MyOrders
        myOrders={myOrders}
        isModalOpen={isModalOpen}
        isLoadingOrders={isLoadingOrders}
      />
    </div>
  );
};

export default ProfilePage;
