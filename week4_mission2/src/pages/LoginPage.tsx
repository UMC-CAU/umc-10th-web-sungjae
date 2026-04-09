import { useNavigate } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { validateSignin, type UserSigninInformation } from '../utils/validate';

const LoginPage = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleChange, handleBlur } = useForm<UserSigninInformation>({
    initialValue: { email: "", password: "" },
    validate: validateSignin,
  });

  const handleFormSubmit = () => {
    console.log(values); 
  };

  const isDisabled = 
    Object.keys(validateSignin(values)).length > 0 || 
    !values.email || !values.password;

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)] bg-black text-white p-4">
      
      <div className="flex flex-col items-center w-full max-w-sm">
        
        {/* ⬅️ 수정 포인트: 로그인 글자와 버튼을 감싸는 flex 컨테이너 추가 */}
        <div className="flex items-center w-full mb-10 relative">
          <button 
            onClick={() => navigate(-1)} 
            className="text-2xl text-gray-400 hover:text-white transition-colors absolute left-0"
          >
            &lt;
          </button>
          <h1 className="text-2xl font-bold w-full text-center">로그인</h1>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {/* 이메일 입력 섹션 */}
          <div className="flex flex-col gap-2">
            <input
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요!"
              className={`p-4 bg-transparent border-b ${touched.email && errors.email ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-pink-500`}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-xs px-1">{errors.email}</span>
            )}
          </div>

          {/* 비밀번호 입력 섹션 */}
          <div className="flex flex-col gap-2">
            <input
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요!"
              className={`p-4 bg-transparent border-b ${touched.password && errors.password ? 'border-red-500' : 'border-gray-600'} focus:outline-none focus:border-pink-500`}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
            />
            {touched.password && errors.password && (
              <span className="text-red-500 text-xs px-1">{errors.password}</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleFormSubmit}
            disabled={isDisabled}
            className={`mt-6 p-4 rounded-lg font-bold transition-colors ${
              isDisabled 
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;