import { FaBell } from 'react-icons/fa';
import React from 'react';

const HeaderComponent = () => {
  return (
    <header className="h-16 px-6 flex items-center justify-between bg-blue-600 text-white shadow-sm">
      <div className="text-lg font-medium">Welcome, Provider</div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <FaBell className="text-white text-lg" />
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-semibold">
            P
          </div>
          <span className="text-sm">Dr. John Doe</span>
        </div>
      </div>
    </header>
  );
};

const Header = React.memo(HeaderComponent);
Header.displayName = 'Header';

export default Header;
