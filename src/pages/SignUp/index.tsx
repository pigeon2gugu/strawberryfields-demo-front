import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '@/apis/User/useSignUp';
import { useCheckDuplication } from '@/apis/User/useCheckDuplication';
import { SignUpRequest, UserType } from '@/typings/User/User';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>('composer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  const signUpMutation = useSignUp();
  const checkDuplicationMutation = useCheckDuplication();

  // 유효성 검사 함수
  const validateForm = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setEmailError('유효한 이메일 주소를 입력해주세요.');
      return false;
    }
    if (password.length < 8) {
      setPasswordError('비밀번호는 8자 이상이어야 합니다.');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    if (name.trim() === '') {
      setNameError('이름을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleEmailBlur = async () => {
    if (email) {
      try {
        const result = await checkDuplicationMutation.mutateAsync({ type: 'email', value: email });
        setEmailError(result.data?.isDuplicated ? '이미 사용 중인 이메일입니다.' : '');
      } catch (error) {
        console.error('이메일 중복 체크 실패', error);
        setEmailError('이메일 중복 체크 중 오류가 발생했습니다.');
      }
    }
  };

  const handleNameBlur = async () => {
    if (name) {
      try {
        const result = await checkDuplicationMutation.mutateAsync({
          type: userType === 'composer' ? 'artist' : 'company',
          value: name
        });
        setNameError(result.data?.isDuplicated ? `이미 사용 중인 ${userType === 'composer' ? '작곡가명' : '기획사명'}입니다.` : '');
      } catch (error) {
        console.error('이름 중복 체크 실패', error);
        setNameError('이름 중복 체크 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePasswordBlur = () => {
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사 수행
    if (!validateForm()) {
      return;
    }

    const requestData: SignUpRequest = {
      email,
      password,
      name,
      ...(userType === 'composer' ? { artist: name } : { company: name })
    };

    try {
      const result = await signUpMutation.mutateAsync(requestData);
      if (result.code === 'SUCCESS_NORMAL') {
        alert('회원가입이 성공적으로 완료되었습니다.');
        // 회원가입 성공 시 폼 초기화
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        // 로그인 페이지로 리다이렉트
        navigate('/login');
      } else {
        setFormError(result.message || '회원가입 중 문제가 발생했습니다.');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      setFormError('회원가입 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">회원가입</h1>
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 px-4 ${userType === 'composer' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setUserType('composer')}
        >
          작곡가
        </button>
        <button
          className={`flex-1 py-2 px-4 ${userType === 'agency' ? 'bg-gray-200' : 'bg-white'}`}
          onClick={() => setUserType('agency')}
        >
          음악기획사
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={handleEmailBlur}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={handlePasswordBlur}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
        <div>
          <input
            type="text"
            placeholder={userType === 'composer' ? '작곡가명' : '기획사명'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={handleNameBlur}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>
        {formError && <p className="text-red-500 text-sm mt-1">{formError}</p>}
        <button 
          type="submit" 
          className="w-full p-2 bg-black text-white rounded hover:bg-gray-800"
          disabled={signUpMutation.isPending || !!emailError || !!nameError || !!passwordError}
        >
          {signUpMutation.isPending ? '처리 중...' : '회원가입'}
        </button>
      </form>
      <p className="mt-4 text-sm text-center">
        이미 계정이 있으신가요? <a href="/login" className="text-blue-500 hover:underline">로그인하기</a>
      </p>
    </div>
  );
};

export default SignupPage;
