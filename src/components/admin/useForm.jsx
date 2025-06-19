import { useState } from 'react';

export const useForm = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  const setFormField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return {
    formData,
    setFormData,
    handleInputChange,
    resetForm,
    setFormField
  };
};