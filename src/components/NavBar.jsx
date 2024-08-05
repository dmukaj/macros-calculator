import React from "react";
import Link from "next/link";
import { FaRegUserCircle, FaSearch, FaCalendarAlt } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between text-white px-20 py-4 w-full bg-[#ffb6b6] font-normal">
      {/* <Link href="/" className="flex items-center justify-center text-2xl ">
        <img src="/images/logo.png" width="150px" />
        <span>My Daily Macros</span>
      </Link> */}
      <Link
        href="/"
        className="flex items-center gap-2 hover:text-[#ff66b2] text-xl"
      >
        <FaRegUserCircle size={35} />
        <h1>Hello User</h1>
      </Link>
      <div className="flex items-center justify-center text-xl gap-6">
        <Link href="/" className="hover:text-[#ff66b2]">
          <FaSearch size={24} />
        </Link>
        <Link href="/calendar" className="hover:text-[#ff66b2]">
          <FaCalendarAlt size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
