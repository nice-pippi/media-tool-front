// hooks/useForm.js
import { ref, reactive } from 'vue';

export function useForm(initialData = {}) {
  const formRef = ref(null);
  const formData = reactive({ ...initialData });

  const validate = async () => {
    try {
      await formRef.value?.validate();
      return true;
    } catch (error) {
      console.log('表单验证失败:', error);
      return false;
    }
  };

  const getData = () => {
    return { ...formData };
  };

  const reset = () => {
    Object.keys(formData).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(initialData, key)) {
        formData[key] = initialData[key];
      } else {
        formData[key] = '';
      }
    });
    formRef.value?.clearValidate();
  };

  return {
    formRef,
    formData,
    validate,
    getData,
    reset,
  };
}
