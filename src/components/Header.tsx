import React from 'react';
import { BiMoon } from 'react-icons/bi';
import { FaRegUser } from 'react-icons/fa6';
import { TbLogout } from 'react-icons/tb';

const Header = () => {
  return (
    <div className="fixed top-0 left-0 h-20 right-0 border-b border-gray-100 flex items-center justify-end px-4 bg-white z-10">
      <div className="hover:bg-gray-50 group transition-colors duration-200 p-2">
        <FaRegUser className="group-hover:text-blue-800 transition-all duration-200 ease-in-out" size={22} />
      </div>
      <div className="hover:bg-gray-50 group transition-colors duration-200 p-2">
        <BiMoon className="group-hover:text-blue-800 transition-all duration-200 ease-in-out" size={24} />
      </div>
      <div className="hover:bg-gray-50 group transition-colors duration-200 p-2">
        <TbLogout className="group-hover:text-blue-800 transition-all duration-200 ease-in-out" size={24} />
      </div>
    </div>
  );
};

export default Header;
