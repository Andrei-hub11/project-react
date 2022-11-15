import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const basicSchema = yup.object().shape({
  name: yup
    .string()
    .min(1, "Informe um nome válido")
    .required("O nome é requerido"),
  secondaryname: yup
    .string()
    .min(1, "Informe um nome válido")
    .required("O nome secundário é requerido"),
  phonenumber: yup
    .string()
    .matches(phoneRegExp, "Número de telefone não válido")
    .required("O número de telefone é requerido"),
  email: yup
    .string()
    .email("Informe um e-mail válido")
    .required("O e-mail é requerido"),
});
