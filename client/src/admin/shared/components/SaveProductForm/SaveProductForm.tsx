import { yupResolver } from '@hookform/resolvers/yup';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { InputErrorMessage } from '@/shared/components/forms/InputErrorMessage';
import { Product } from '@/shared/interfaces';
import { getEnvs, newProductFormSchema } from '@/shared/utils';
import {
  useProductCreateMutation,
  useProductUpdateMutation,
} from '@/store/products';

const { VITE_API_URL } = getEnvs();

export interface SaveProductFormProps {
  editProduct?: Product;
}

export type SaveroductFormData = {
  name: string;
  countInStock: number;
  price: number;
  category: string;
  description: string;
};

const SaveProductForm: React.FC<SaveProductFormProps> = ({ editProduct }) => {
  const [image, setImage] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // upd image
  const [imgWasChanged, setImgWasChanged] = useState(false);

  const navigate = useNavigate();

  ////* mutation
  const addProdMutation = useProductCreateMutation(navigate);
  const updateProdMutation = useProductUpdateMutation(navigate);

  ////* form
  const form = useForm<SaveroductFormData>({
    resolver: yupResolver(newProductFormSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSave: SubmitHandler<SaveroductFormData> = formData => {
    ///* UPD
    if (editProduct?.id) {
      return updateProdMutation.mutate({
        id: editProduct.id,
        name: formData.name,
        count_in_stock: formData.countInStock,
        category: formData.category,
        description: formData.description,
        price: formData.price,
        image: image,
        updImg: imgWasChanged, // if we change img, si it set image in req
      });
    }

    ///* Create
    addProdMutation.mutate({
      name: formData.name,
      count_in_stock: formData.countInStock,
      category: formData.category,
      description: formData.description,
      price: formData.price,
      image: image,
    });
  };

  ////* effects
  useEffect(() => {
    if (!editProduct?.id) return;

    reset({ ...editProduct, countInStock: editProduct.count_in_stock } as any);
    setImage(editProduct.image as any);
  }, [editProduct, reset]);

  ////* handlers
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
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

  if (addProdMutation.isLoading) return <p>Loader....</p>;

  return (
    <form onSubmit={handleSubmit(onSave)} noValidate>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        {/* ----- name ----- */}
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Type product name"
          />
          <InputErrorMessage error={errors.name?.message} />
        </div>

        {/* ----- count in stock ----- */}
        <div>
          <label
            htmlFor="count_in_stock"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Count in Stock
          </label>
          <input
            {...register('countInStock')}
            type="number"
            id="count_in_stock"
            min={1}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Count in Stock"
          />
          <InputErrorMessage error={errors.countInStock?.message} />
        </div>

        {/* ----- price ----- */}
        <div>
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price
          </label>
          <input
            {...register('price')}
            required
            type="number"
            id="price"
            min={0}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="$2999"
          />
          <InputErrorMessage error={errors.price?.message} />
        </div>

        {/* ----- category ----- */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <input
            {...register('category')}
            required
            type="text"
            id="category"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Category"
          />
          <InputErrorMessage error={errors.category?.message} />
        </div>

        {/* ----- description ----- */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            {...register('description')}
            required
            id="description"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Write product description here"
          ></input>
          <InputErrorMessage error={errors.description?.message} />
        </div>

        {/* ======== Drag and Drop ======== */}
        <div className="sm:col-span-2">
          <div className="flex items-center justify-center w-full">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
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
                  src={filePreview || `${VITE_API_URL}${editProduct?.image}`}
                  alt="Selected Image"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ======= Submit btn ======= */}
      <button
        type="submit"
        className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        <svg
          className="mr-1 -ml-1 w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clipRule="evenodd"
          ></path>
        </svg>
        {editProduct?.id ? 'Save' : 'Add new'} product
      </button>
    </form>
  );
};

export default SaveProductForm;
