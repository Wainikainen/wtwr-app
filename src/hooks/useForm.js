import { useState, useRef } from "react";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const formRef = useRef(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const isValid = formRef.current?.checkValidity() ?? false;

  return { values, handleChange, setValues, resetForm, isValid, formRef};
}
