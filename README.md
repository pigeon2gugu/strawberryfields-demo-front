# Strawberryfields Demo Frontend

스트로베리필즈 demo 웹서비스 프론트엔드 구현  

## 프로젝트 소개

작곡가와 기획사 간의 음악 피칭을 위한 웹 플랫폼
작곡가는 곡을 업로드하고 기획사에 피칭할 수 있으며, 기획사는 받은 피칭을 확인할 수 있습니다.

### 주요 기능
- 사용자 인증 (로그인/회원가입)
- 작곡가: 곡 업로드, 업로드 내역 확인, 피칭 내역 확인, 새로운 피칭 생성
- 기획사: 받은 피칭 내역 확인

### 기술 스택
- React 18
- TypeScript
- Tailwind CSS

## 시작하기

### 필요 조건
- Node.js (v16 이상)
- npm (v7 이상)

### 설치

```shell
# 저장소 클론
git clone https://github.com/your-username/strawberryfields-demo-front.git
cd strawberryfields-demo-front

# 의존성 패키지 설치
npm install
```

### 실행

```shell
# 개발 모드로 실행
npm start
```

## 사용 가이드

- 프로젝트를 실행하면 로그인 페이지로 이동합니다.
- 회원 가입 시 작곡가 또는 기획사 유저로 가입할 수 있습니다.
- 로그인 시 유저 역할에 따라 다른 페이지로 이동합니다:
  - 작곡가: 곡 업로드 목록 페이지
  - 기획사: 피칭 내역 페이지

### 작곡가 페이지
1. 곡 업로드 목록 (`/composer/tracks`)
   - 업로드한 곡 목록 확인
   - 새로운 곡 업로드 가능
2. 피칭 내역 (`/composer/pitchings`)
   - 피칭 내역 목록 확인
   - 새로운 피칭 생성 가능

### 기획사 페이지
1. 피칭 내역 (`/agency/pitchings`)
   - 받은 피칭 내역 확인
