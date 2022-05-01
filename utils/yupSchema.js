import * as yup from "yup";

const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email(),
  subject: yup.string().required("Subject is required"),
  message: yup.string().required("Message is required"),
});

export default contactSchema;
