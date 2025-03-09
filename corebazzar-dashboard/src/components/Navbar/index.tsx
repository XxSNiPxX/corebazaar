import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

type Props = {
  className?: string;
};

const Navbar = ({ className }: Props) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
		<nav
	      className={clsx(
	        "border-b border-gray-700 p-4 fixed w-full top-0 z-50",
	        "bg-[#141414]", // Custom dark gray color
	        className
	      )}
	    >
		      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center gap-4">
          <div className="text-blue-500 font-bold text-2xl flex items-center">
            <span className="text-blue-500 mr-2">
              <svg fill="none" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" fill="#0284c7" r="8" />
                <circle cx="8" cy="12" fill="#000" r="2" />
                <circle cx="16" cy="12" fill="#000" r="2" />
                <circle cx="12" cy="8" fill="#000" r="2" />
                <circle cx="12" cy="16" fill="#000" r="2" />
              </svg>
            </span>
            CoreBazaar
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {["/", "/features", "/docs", "/use-cases"].map((path) => (
            <Link
              key={path}
              to={path}
              className={clsx(
                "px-4 py-2 rounded-full transition duration-200",
                isActive(path) ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              )}
            >
              {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden mt-4 flex flex-col items-center gap-4">
          {["/", "/features", "/docs", "/use-cases"].map((path) => (
            <Link
              key={path}
              to={path}
              className={clsx(
                "block w-full text-center px-4 py-2 rounded-full transition duration-200",
                isActive(path) ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {path === "/" ? "Home" : path.replace("/", "").replace("-", " ")}
            </Link>
          ))}
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
