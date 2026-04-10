import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// 중복되거나 사용하지 않는 signupSchema 제거
import { loginSchema, type LoginSchema } from '../utils/validate'; 
import { login } from '../../api/auth'; 
import { useLocalStorage } from '../hooks/useLocalStorage'; 

const LoginPage = () => {
  const navigate = useNavigate();
  const { setToken } = useLocalStorage(); 

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({ 
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  // 실제 로그인 요청 처리
  const onLoginSubmit = async (data: LoginSchema) => {
    try {
      // API 주소가 http://localhost:8000/v1/auth/signin 인지 확인하세요!
      const response = await login(data);
      
      // 서버 응답에서 토큰 추출
      const { accessToken, refreshToken } = response.data.data;
      
      // 토큰 저장
      setToken(accessToken, refreshToken);
      
      alert("로그인에 성공했습니다!");
      navigate('/'); 
    } catch (error: any) {
      console.error("로그인 에러:", error);
      alert(error.response?.data?.message || "로그인 정보가 올바르지 않습니다.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] bg-black text-white p-4">
      <div className="flex flex-col items-center w-full max-w-sm">
        
        {/* 타이틀 및 뒤로 가기 영역 */}
        <div className="flex items-center w-full mb-10 relative">
          <button 
            type="button"
            onClick={() => navigate(-1)} 
            className="text-2xl text-gray-400 hover:text-white transition-colors absolute left-0"
          >
            &lt;
          </button>
          <h1 className="text-2xl font-bold w-full text-center">로그인</h1>
        </div>

        <form onSubmit={handleSubmit(onLoginSubmit)} className="flex flex-col gap-6 w-full">
          {/* 이메일 입력 섹션 */}
          <div className="flex flex-col gap-2">
            <input
              {...register('email')}
              type="email"
              placeholder="이메일을 입력해주세요!"
              className={`p-4 bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-pink-500`}
            />
            {errors.email && (
              <span className="text-red-500 text-xs px-1">{errors.email.message}</span>
            )}
          </div>

          {/* 비밀번호 입력 섹션 */}
          <div className="flex flex-col gap-2">
            <input
              {...register('password')}
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className={`p-4 bg-transparent border-b ${errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-pink-500`}
            />
            {errors.password && (
              <span className="text-red-500 text-xs px-1">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={`mt-6 p-4 rounded-lg font-bold transition-colors ${
              !isValid 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;