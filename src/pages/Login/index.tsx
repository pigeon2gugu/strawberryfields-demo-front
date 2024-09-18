import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '@/apis/Auth/useLogin';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await loginMutation.mutateAsync({ email, password });

      if (result.code === 'SUCCESS_NORMAL') {
        const userRole = result.data.role;
        if (userRole === 'COMPOSER') {
          navigate('/composer/track');
        } else if (userRole === 'AGENCY') {
          navigate('/agency/pitching');
        } else {
          setError('알 수 없는 역할입니다. 관리자에게 문의하세요.');
        }
      } else {
        setError(result.message || '알 수 없는 오류가 발생했습니다.');
      }
    } catch (error: any) {
      const responseCode = error.response?.data?.code;
      if (responseCode === 'LOGIN_FAILED' || responseCode == 'NOT_FOUND_USER') {
        setError('로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인하세요.');
      } else {
        console.error('Login failed', error);
        setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded box-border h-12"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded box-border h-12"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button 
            type="submit" 
            className="w-full p-3 bg-black text-white rounded hover:bg-gray-800 box-border h-12"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          계정이 없으신가요? <a href="/signup" className="text-blue-500 hover:underline">회원가입</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
