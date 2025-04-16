import React from 'react';
import { NavLink } from 'react-router';

type SidebarLinkProps = {
  children: React.ReactNode;
  to: string;
  icon: React.ElementType;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ children, to, icon: Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group transition-all duration-300 ease-in-out font-medium text-lg flex gap-4 items-center rounded-lg py-4 px-6
        ${isActive ? 'bg-zinc-700 text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-black'}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`duration-300 ease-in-out transition-colors ${
              isActive ? 'text-white' : 'text-gray-700 group-hover:text-blue-800'
            }`}
            size={24}
          />
          <span>{children}</span>
        </>
      )}
    </NavLink>
  );
};

export default SidebarLink;
