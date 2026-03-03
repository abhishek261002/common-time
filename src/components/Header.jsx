import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartIcon from "./CartIcon";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="relative z-50 bg-[#F9F7F2] h-[100px] w-full flex items-center px-8 lg:px-16 border-b border-gray-100">
      
      {/* LEFT */}
      <div className="flex-1 flex items-center space-x-12">
        
        {/* SHOP */}
        <div className="group h-full flex items-center relative">
          <Link
            to="/shop"
            className="nav-link text-xs uppercase font-medium tracking-[0.15em] text-[#1A1A1A]"
          >
            SHOP
          </Link>

          <div className="dropdown-panel absolute top-[100px] left-0 w-screen bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-16 px-12 lg:px-24">
              <div className="flex flex-col space-y-6">
                <Link to="/shop" className="dropdown-link">Coffee</Link>
                <Link to="/shop" className="dropdown-link">Merchandise</Link>
                <Link to="/shop" className="dropdown-link">Order Online</Link>
              </div>
            </div>
          </div>
        </div>

        {/* LOCATION */}
        <div className="group h-full flex items-center relative">
          <span className="nav-link text-xs uppercase font-medium tracking-[0.15em] text-[#1A1A1A]">
            LOCATION
          </span>

          <div className="dropdown-panel absolute top-[100px] left-0 w-screen bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-16 px-12 lg:px-24">
              <div className="flex flex-col space-y-6">
                <Link to="/about" className="dropdown-link">About</Link>
                <Link to="/contact" className="dropdown-link">Inquiry</Link>
                <Link to="/locations" className="dropdown-link">Our Locations</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER LOGO */}
      <Link
        to="/"
        className="absolute left-1/2 -translate-x-1/2 text-center"
      >
        <div className="flex items-center gap-1">
          <span className="font-light tracking-[0.25em] text-lg text-[#1A1A1A]">
            COMMON
          </span>
          <span className="font-bold tracking-[0.25em] text-lg text-[#1A1A1A] italic">
            TIME
          </span>
        </div>
      </Link>

      {/* RIGHT */}
      <div className="flex-1 flex items-center justify-end space-x-10">

        {/* MENU */}
        <div className="group h-full flex items-center relative">
          <span className="nav-link text-xs uppercase font-medium tracking-[0.15em] text-[#1A1A1A]">
            MENU
          </span>

          <div className="dropdown-panel absolute top-[100px] left-0 w-screen bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-16 px-12 lg:px-24">
              <div className="flex flex-col space-y-6">
                <Link to="/menu" className="dropdown-link">Cafe Menu</Link>
                <Link to="/shop" className="dropdown-link">Order Online</Link>
              </div>
            </div>
          </div>
        </div>

        {/* AUTH LINKS */}
        {user ? (
          <>
            <Link to="/orders" className="nav-link text-xs uppercase tracking-[0.15em]">
              ORDERS
            </Link>
            <button
              onClick={() => signOut()}
              className="nav-link text-xs uppercase tracking-[0.15em]"
            >
              LOGOUT
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="nav-link text-xs uppercase tracking-[0.15em]"
          >
            LOGIN
          </Link>
        )}

        <CartIcon />

        <a
          href="https://www.instagram.com/itscommontime"
          target="_blank"
          rel="noreferrer"
          className="text-[#1A1A1A] hover:opacity-70 transition-opacity"
        >
          <FaInstagram size={18} />
        </a>
      </div>
    </header>
  );
}