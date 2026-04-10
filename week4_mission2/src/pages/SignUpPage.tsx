import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';

import { signupSchema, type SignupSchema } from '../utils/validate';
import { signup } from '../../api/auth';

const SignUpPage = () => {
  const navigate = useNavigate();
  // 단계별 폼 관리를 위한 상태 (1: 이메일, 2: 비밀번호, 3: 이름)
  const [step, setStep] = useState(1);
  // 비밀번호 가시성 토글 상태
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange', // 실시간 유효성 검사
  });

  // 폼 제출 함수 (서버 연동)
  const onSubmit = async (data: SignupSchema) => {
    try {
      // Swagger 명세에 맞춘 필드 전송 (passwordCheck는 제외)
      const response = await signup({
      email: data.email,
      password: data.password,
      name: data.name,
    });

      if (response.status === 201) {
        alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
        navigate('/login');
      }
    } catch (error: any) {
      console.error("회원가입 실패:", error);
      alert(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  // 다음 단계로 넘어가기 전 유효성 검사 체크 함수
  const handleNextStep = async (fields: any) => {
    const isStepValid = await trigger(fields);
    if (isStepValid) setStep((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-black text-white p-4">
      <div className="w-full max-w-sm">
        
        {/* 뒤로 가기 및 타이틀 영역 */}
        <div className="flex items-center w-full mb-10 relative">
          <button 
            type="button"
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} 
            className="text-2xl text-gray-400 hover:text-white absolute left-0"
          >
            &lt;
          </button>
          <h1 className="text-2xl font-bold w-full text-center">회원가입</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          
          {/* 1단계: 이메일 입력 */}
          {step === 1 && (
            <div className="flex flex-col gap-2">
              <input
                {...register('email')}
                placeholder="이메일을 입력해주세요!"
                className={`p-4 bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-600'} outline-none focus:border-pink-500`}
              />
              {errors.email && <span className="text-red-500 text-xs px-1">{errors.email.message}</span>}
              <button
                type="button"
                onClick={() => handleNextStep('email')}
                disabled={!watch('email') || !!errors.email}
                className="mt-6 p-4 rounded-lg font-bold bg-pink-500 disabled:bg-gray-700 disabled:text-gray-400"
              >
                다음
              </button>
            </div>
          )}

          {/* 2단계: 비밀번호 입력 및 재확인 */}
          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  placeholder="비밀번호를 입력해주세요!"
                  className={`w-full p-4 bg-transparent border-b ${errors.password ? 'border-red-500' : 'border-gray-600'} outline-none focus:border-pink-500`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showPassword ? '👁️' : '🙈'}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-xs px-1">{errors.password.message}</span>}
              
              <input
                type="password"
                {...register('passwordCheck')}
                placeholder="비밀번호를 한 번 더 입력해주세요!"
                className={`p-4 bg-transparent border-b ${errors.passwordCheck ? 'border-red-500' : 'border-gray-600'} outline-none focus:border-pink-500`}
              />
              {errors.passwordCheck && <span className="text-red-500 text-xs px-1">{errors.passwordCheck.message}</span>}
              
              <button
                type="button"
                onClick={() => handleNextStep(['password', 'passwordCheck'])}
                disabled={!watch('passwordCheck') || !!errors.passwordCheck}
                className="mt-6 p-4 rounded-lg font-bold bg-pink-500 disabled:bg-gray-700 disabled:text-gray-400"
              >
                다음
              </button>
            </div>
          )}

          {/* 3단계: 이름(닉네임) 입력 */}
          {step === 3 && (
            <div className="flex flex-col gap-2">
              <input
                {...register('name')}
                placeholder="이름을 입력해주세요!"
                className={`p-4 bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-gray-600'} outline-none focus:border-pink-500`}
              />
              {errors.name && <span className="text-red-500 text-xs px-1">{errors.name.message}</span>}
              <button
                type="submit"
                disabled={!isValid}
                className="mt-6 p-4 rounded-lg font-bold bg-pink-500 hover:bg-pink-600 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
              >
                회원가입 완료
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;