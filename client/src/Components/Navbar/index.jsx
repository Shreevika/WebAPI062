import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

//import assets
import CloseIcon from "../../Assets/Svg/CloseIcon";
import MenuIcon from "../../Assets/Svg/MenuIcon";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-4 px-4 lg:px-12 w-full fixed top-0 left-0 z-10 bg-slate-100">
      <div className="md:flex items-center justify-between py-2 md:px-5 px-2">
        <Link to="/">
          <p className="font-bold">TRTL</p>
        </Link>
        <div className="absolute right-4 top-6 md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
        <ul
          className={`md:flex items-center gap-x-5 absolute md:static left-0 md:w-auto w-full bg-gray-100 md:pl-0 pl-7 transition-all duration-500 ease-in ${
            isOpen
              ? "top-[75px] opacity-100"
              : "top-[-490px] md:opacity-100 opacity-0"
          }`}
        >
          <li className="md:my-0 my-7 relative">
            <Link
              className={classNames("px-2", pathname === "/" && "underline")}
              to="/"
            >
              Home
            </Link>
          </li>
          {token ? (
            <li className="md:my-0 my-7 relative">
              <a
                className={classNames(
                  "px-2",
                  pathname === "/login" && "underline"
                )}
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
              >
                Logout
              </a>
            </li>
          ) : (
            <li className="md:my-0 my-7 relative">
              <Link
                className={classNames(
                  "px-2",
                  pathname === "/login" && "underline"
                )}
                to="/login"
              >
                Login
              </Link>
            </li>
          )}
          {token ? null : (
            <li className="md:my-0 my-7 relative">
              <Link
                className={classNames(
                  "px-2",
                  pathname === "/register" && "underline"
                )}
                to="/register"
              >
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
