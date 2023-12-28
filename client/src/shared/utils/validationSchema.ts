import * as yup from 'yup';

const emailYupValidation = yup
  .string()
  .matches(
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Invalid email'
  )
  .required('Email is requiered')
  .min(5, 'Min 5 characteres')
  .max(24, 'Max 12 characteres');

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
