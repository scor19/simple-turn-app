import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
// Esquema de validación de formulario en yup
export const patientSchema = yup.object().shape({
  name: yup
    .string()
    .required('Please, enter a name')
    .max(30, 'Name is too long'),
  email: yup.string().email('Enter a valid email').optional(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('A phone number is required')
    .typeError('Please, enter a number'),
  // appointment: yup.date().required('Enter an appointment date'),
  reason: yup.string().required('Please, enter an appointment reason'),
  record: yup.string().optional(),
});

export const editSchema = yup.object().shape({
  record: yup.string().optional(),
  reason: yup.string().required('Please, enter an appointment reason'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('A phone number is required')
    .typeError('Please, enter a number'),
  name: yup
    .string()
    .required('Please, enter a name')
    .max(30, 'Name is too long'),
  email: yup.string().email('Enter a valid email').optional(),
  appointment: yup.string().optional(),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Please, enter an email'),
  password: yup.string().required('Please, enter a password'),
});
