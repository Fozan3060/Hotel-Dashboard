import React, { useState } from 'react';
import { HiOutlineHome } from "react-icons/hi2";
import { TbBrandBooking } from "react-icons/tb";
import { MdCabin } from "react-icons/md";
import SidebarLink from './SidebarLink';
import { HiOutlineUsers } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";

const Sidebar = () => {
  const [open, setopen] = useState(true)
  return (
    <div className='lg:w-80 w-8'>
      <div
        className={`lg:sticky z-10 fixed w-80   bg-white  top-0 ${open ? "translate-x-0" : "-translate-x-[17rem]"
          } transition-transform duration-300 h-screen border-r border-gray-100  `}
      >
        <div className="flex h-20  justify-end   px-3 text-gray-800">
          <button className={`lg:hidden block ${open ? "transform origin-center rotate-180 " : "transform origin-center rotate-270 "} duration-500 transition-allduration-1000 transition-all`} onClick={() => setopen((prev) => !prev)}>
            <FaArrowRight size={26} />
          </button>
        </div>
        <nav className="flex flex-col gap-2  px-6">
          <SidebarLink to="/" icon={HiOutlineHome}>
            Home
          </SidebarLink>
          <SidebarLink to="/booking" icon={TbBrandBooking}>
            Booking
          </SidebarLink>
          <SidebarLink to="/cabin" icon={MdCabin}>
            Cabin
          </SidebarLink>
          <SidebarLink to="/users" icon={HiOutlineUsers}>
            Users
          </SidebarLink>
          <SidebarLink to="/settings" icon={IoSettingsOutline}>
            Settings
          </SidebarLink>
        </nav>
      </div>
    </div>

  );
};

export default Sidebar;
