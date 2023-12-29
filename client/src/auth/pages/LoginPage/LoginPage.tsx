import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { InputErrorMessage } from '@/shared/components/forms/InputErrorMessage';
import { loginFormSchema } from '@/shared/utils';
import { useLogin } from '@/store/auth';

export interface LoginPageProps {}

export type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC<LoginPageProps> = () => {
  ////* form
  const form = useForm<LoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  ////* tanstack
  const loginMutation = useLogin(form.getValues(), reset);

  ////* handlers
  const onLogin: SubmitHandler<LoginFormData> = async () => {
    if (loginMutation.isLoading) return;
    loginMutation.mutate();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex justify-center mb-6">
          <span className="inline-block bg-gray-200 rounded-full p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>

        {/* ========== Form ========== */}
        <form onSubmit={handleSubmit(onLogin)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Email *
            </label>
            <input
              type="email"
              id="email"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="hello@shopzone.com"
              {...register('email')}
            />
            <InputErrorMessage error={errors.email?.message} />
          </div>

          {/* ----- Password ----- */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Password *
            </label>
            <input
              type="password"
              id="password"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="******"
              {...register('password')}
            />
            <InputErrorMessage error={errors.password?.message} />
          </div>

          {/* ----- Submit ----- */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 mt-2 mb-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
            disabled={loginMutation.isLoading}
          >
            Log in
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Don't have an account?{' '}
            <Link
              to={'/auth/register'}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
