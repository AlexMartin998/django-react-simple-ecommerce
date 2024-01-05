import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { InputErrorMessage } from '@/shared/components/forms';
import { User } from '@/shared/interfaces';
import { getEnvs, updateProfileFormSchema } from '@/shared/utils';
import { useEditProfileMutation } from '@/store/auth';
import { useUiStore } from '@/store/ui';

const { VITE_API_URL } = getEnvs();

export type ProfileFormProps = {
  user: User;
};

export type SaveProfileFormData = {
  name: string;
  last_name: string;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const setModalOpen = useUiStore(s => s.setModalOpen);

  ///* local state
  const [image, setImage] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // upd image
  const [imgWasChanged, setImgWasChanged] = useState(false);

  const editProfileMutation = useEditProfileMutation(setModalOpen);

  ////* form
  const form = useForm<SaveProfileFormData>({
    resolver: yupResolver(updateProfileFormSchema),
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  ///* effects
  useEffect(() => {
    reset(user);
    setImage(user?.avatar as any);
  }, [reset, user]);

  ////* handlers
  const onSave: SubmitHandler<SaveProfileFormData> = formData => {
    editProfileMutation.mutate({
      ...user!,
      ...formData,
      avatar: image,
      updImg: imgWasChanged, // if we change img, si it set image in req
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /// drag & drop
  const handleDragEnter = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsHovered(false);
  };

  const removeImage = () => {
    setImage(null);
    setIsHovered(false);
    setImgWasChanged(true);
  };

  return (
    <div className="p-11 relative">
      {/* ============ Close modal ============ */}
      <button
        onClick={() => setModalOpen(false)}
        className="absolute top-2 right-4 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
        data-modal-toggle="defaultModal"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close modal</span>
      </button>

      {/* ============ Form ============ */}
      <form onSubmit={handleSubmit(onSave)} noValidate>
        {/* ----- Name ---- */}
        <div className="p-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Name"
          />
          <InputErrorMessage error={errors.name?.message} />
        </div>

        {/* ----- Last name ---- */}
        <div className="p-3">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Last Name
          </label>
          <input
            {...register('last_name')}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last name"
          />
          <InputErrorMessage error={errors.last_name?.message} />
        </div>

        {/* ======== Image Profile ======== */}
        {/* ----- Drag and Drop ---- */}
        <div className="sm:col-span-2 mt-4">
          <div className="flex mx-auto w-[90%]">
            {!image ? (
              // drop box is a label with styles > input file (wrapped)
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer  bg-gray-40 ${
                  isHovered ? 'bg-gray-600' : 'hover:bg-gray-600'
                }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>

                {/* ----- Input File / Image ----- */}
                <input
                  ref={fileInputRef}
                  type="file"
                  id="dropzone-file"
                  multiple={true}
                  onChange={handleFileChange}
                  className="absolute w-full h-[300px] opacity-0"
                  accept="image/*"
                />
              </label>
            ) : (
              ///* Image Preview (not sent yet)
              <div>
                <button
                  onClick={removeImage}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>

                <img
                  className="h-48 w-96"
                  src={filePreview || `${VITE_API_URL}${user.avatar}`}
                  alt="Selected Image"
                />
              </div>
            )}
          </div>

          <div className="flex mx-auto mt-5 space-x-3 md:mt-6">
            <button
              className="flex mx-auto px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
              type="submit"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
