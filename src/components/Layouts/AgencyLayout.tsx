import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AgencyLayout: React.FC = () => {
  return (
    <div className="flex">
      <aside className="w-64 h-screen bg-gray-100 p-4">
      <div className="text-xl font-bold mb-4">음악기획사 계정</div>  
        <nav>
          <ul>
            <li><Link to="/agency/pitchings" className="block py-2">피칭 목록</Link></li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AgencyLayout;