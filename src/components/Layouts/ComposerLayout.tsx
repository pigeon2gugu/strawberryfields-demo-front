import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ComposerLayout: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-4">
        <div className="text-xl font-bold mb-4">작곡가 계정</div>  
        <nav>
          <ul>
            <li>
              <Link to="/composer/tracks" className="block py-2">
                곡 목록
              </Link>
            </li>
            <li>
              <Link to="/composer/pitchings" className="block py-2">
                피칭
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ComposerLayout;
