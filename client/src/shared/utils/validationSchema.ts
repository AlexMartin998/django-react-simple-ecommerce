import * as yup from 'yup';

////* Auth
const emailYupValidation = yup
  .string()
  .matches(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Invalid email'
  )
  .required('Email is requiered')
  .min(5, 'Min 5 characteres')
  .max(48, 'Max 48 characteres');

const passwordYupValidation = yup
  .string()
  .required('Password is requiered')
  .min(5, 'Min 5 characteres')
  .max(33, 'Max 12 characteres');

export const registerFormSchema = yup.object({
  email: emailYupValidation,
  password: passwordYupValidation,
  last_name: yup
    .string()
    .required('Name is requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  name: yup
    .string()
    .required('Name is requiered')
    .min(2, 'Min 2 characteres')
    .max(30, 'Max 12 characteres'),
  confirmPassword: yup
    .string()
    .required('Confirm password is requiered')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

export const loginFormSchema = yup.object({
  email: emailYupValidation,
  password: passwordYupValidation,
});

////* Products
export const newProductFormSchema = yup.object({
  name: yup.string().required('Name is required'),
  countInStock: yup
    .number()
    .typeError('Count in Stocke is required')
    .required('Please provide count in stock')
    .min(1, 'It must be greater than or equal to 1'),
  price: yup
    .number()
    .typeError('Price is required')
    .required('Please provide price')
    .min(0, 'It must be greater than or equal to 0'),
  category: yup.string().required('Category is required'),
  description: yup.string().required('Description is required'),
});
