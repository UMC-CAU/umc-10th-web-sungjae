import { useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => any;
}

const useForm = <T extends Record<string, any>>({ initialValue, validate }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValue);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // 값이 바뀔 때마다 values 업데이트 및 실시간 에러 체크
  const handleChange = (name: string, value: string) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    
    // 실시간으로 에러 상태 업데이트
    const newErrors = validate(newValues);
    setErrors(newErrors);
  };

  // 포커스가 나갔을 때 해당 필드를 건드림 상태로 변경
  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  return { values, errors, touched, handleChange, handleBlur };
};

export default useForm;