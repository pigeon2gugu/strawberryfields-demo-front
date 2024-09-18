import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-10 flex justify-between items-center p-4 bg-gray-100">
      <div className="text-xl font-bold">스트로베리필즈</div>
      <nav>
        <Link to="/login" className="mr-4">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </nav>
    </header>
  );
};

export default Header;
