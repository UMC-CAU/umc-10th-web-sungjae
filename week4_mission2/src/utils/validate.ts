import * as z from 'zod';

// 1. 공통적으로 사용할 기본 스키마 정의
const baseSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }),
  name: z.string().min(1, { message: "이름은 필수 입력 항목입니다." }),
});

// 2. 로그인용 스키마 (이메일, 비밀번호만 사용)
export const loginSchema = baseSchema.pick({
  email: true,
  password: true,
});

// 3. 회원가입용 스키마 (비밀번호 확인 로직 포함)
export const signupSchema = baseSchema.extend({
  passwordCheck: z.string(),
}).refine((data) => data.password === data.passwordCheck, {
  path: ["passwordCheck"],
  message: "비밀번호가 일치하지 않습니다.",
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;