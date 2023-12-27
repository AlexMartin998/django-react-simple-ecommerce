import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import { InputErrorMessage } from '@/shared/components/forms/InputErrorMessage';
import { registerFormSchema } from '@/shared/utils';
import { registerUser } from '@/zustand/auth';

interface RegisterPageProps {}

export type RegisterFormData = {
  email: string;
  name: string;
  last_name: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage: React.FC<RegisterPageProps> = () => {
  const navigate = useNavigate();

  ////* form
  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerFormSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  ////* tanstack
  const registerMutation = useMutation({
    mutationFn: () => registerUser(form.getValues()),
    onSuccess: () => {
      toast.success('Successful registration');
      reset();
      return navigate('/auth/login');
    },
    onError: err => {
      if (isAxiosError(err)) return toast.error(err.response?.data.error);

      toast.error('Something went wrong');
      console.log(err);
    },
  });

  ////* handlers
  const onRegister: SubmitHandler<RegisterFormData> = async () => {
    if (registerMutation.isPending) return;
    registerMutation.mutate();
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

        <h2 className="text-2xl font-semibold text-center mb-6">
          Create a new account
        </h2>

        {/* ========== Form ========== */}
        <form onSubmit={handleSubmit(onRegister)} noValidate>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Your Name *
            </label>
            <input
              type="text"
              id="name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="John"
              {...register('name')}
            />
            <InputErrorMessage error={errors.name?.message} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="last_name"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Your Last Name *
            </label>
            <input
              type="text"
              id="last_name"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="Doe"
              {...register('last_name')}
            />
            <InputErrorMessage error={errors.last_name?.message} />
          </div>

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
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              required
              placeholder="******"
              {...register('confirmPassword')}
            />
            <InputErrorMessage error={errors.confirmPassword?.message} />
          </div>

          {/* ----- Submit ----- */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 mt-2 mb-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-400"
            disabled={registerMutation.isPending}
          >
            Register
          </button>

          <p className="text-sm font-light text-gray-500 dark:text-gray-400 text-center">
            Have an account?{' '}
            <Link
              to={'/auth/login'}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
