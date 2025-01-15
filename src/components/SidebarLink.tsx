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
      className="group hover:bg-gray-50 hover:text-black text-gray-700 transition-all duration-300 ease-in-out font-medium text-lg flex gap-4 items-center rounded-lg py-4 px-6"
      to={to}
    >
      <Icon className="text-gray-700 group-hover:text-blue-800 duration-300 ease-in-out transition-colors" size={24} />
      <span>{children}</span>
    </NavLink>
  );
};

export default SidebarLink;
