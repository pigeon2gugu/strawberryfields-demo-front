export type UserType = 'composer' | 'agency';

// 기본 사용자 정보
export interface UserBase {
  email: string;
  name: string;
}

// 작곡가 특정 정보
export interface ComposerInfo extends UserBase {
  artist: string;
}

// 기획사 특정 정보
export interface AgencyInfo extends UserBase {
  company: string;
}

// 회원가입 요청 타입
export type SignUpRequest = {
  password: string;
} & (ComposerInfo | AgencyInfo);

// 회원가입 응답 타입
export interface SignUpResponse {
  userId: number;
  email: string;
}

// 중복 체크 요청 타입
export type DuplicationCheckRequest = {
  type: 'email' | 'artist' | 'company';
  value: string;
}

// 중복 체크 응답 타입
export interface DuplicationCheckResponse {
  isDuplicated: boolean;
}

//기획사 정보
export interface AgencyItem {
  id: number;
  company: string;
}