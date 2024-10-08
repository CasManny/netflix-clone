import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const { user, logout } = useAuthStore();
    const [mobile, setMobile] = useState(false);
    const {  setContentType } = useContentStore()
  const toggleMenu = () => {
    setMobile(!mobile);
  };
  return (
    <header className="max-w-6xl mx-auto flex flex-wrap justify-between items-center p-4 h-20">
      <div className="flex items-center z-50 gap-10">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="logo" className="w-32 sm:w-40" />
        </Link>
        {/* {desktop view} */}
        <div className="hidden sm:flex gap-2 items-center">
          <Link to={"/"} className="hover:underline" onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to={"/"} className="hover:underline" onClick={() => setContentType('tv')}>
            Tv shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History{" "}
          </Link>
        </div>
      </div>

      <div className="flex gap-2 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {mobile && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMenu}
          >
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
