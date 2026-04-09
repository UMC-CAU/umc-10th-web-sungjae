export interface UserSigninInformation {
  email?: string;
  password?: string;
}

export const validateSignin = (values: UserSigninInformation) => {
  const errors: UserSigninInformation = {};

  // 이메일 유효성 검사: @와 . 포함 여부 확인
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (!emailRegex.test(values.email)) {
    errors.email = "올바른 이메일 형식을 입력해주세요.";
  }

  // 비밀번호 유효성 검사: 8자 이상
  if (!values.password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (values.password.length < 8) {
    errors.password = "비밀번호는 8자 이상이어야 합니다.";
  }

  return errors;
};