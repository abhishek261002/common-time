import { useState } from "react";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartIcon from "./CartIcon";

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-[#F9F7F2] h-[80px] lg:h-[100px] w-full flex items-center px-6 lg:px-16 border-b border-gray-100">
      {/* STITCH STYLING ENCAPSULATION */}
      <style>{`
        .nav-link {
          position: relative;
          letter-spacing: 0.15em;
          transition: all 0.3s ease;
        }

        /* 1px hover underline */
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Stitch Dropdown Animation */
        .dropdown-panel {
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .group:hover .dropdown-panel {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-link {
          font-size: 2.25rem;
          font-weight: 300;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: -0.025em;
          transition: color 0.3s ease;
        }

        .dropdown-link:hover {
          color: #1A1A1A;
        }

        .wordmark {
          letter-spacing: 0.3em;
          font-weight: 700;
          text-transform: uppercase;
        }
      `}</style>

      {/* MOBILE TOGGLE */}
      <button 
        className="lg:hidden text-[#1A1A1A] z-[60] mr-6" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* LEFT: SHOP, LOCATION */}
      <div className="hidden lg:flex flex-1 items-center space-x-12 h-full">
        <div className="group h-full flex items-center static">
          <Link to="/shop" className="nav-link text-xs uppercase font-medium text-[#1A1A1A]">
            SHOP
          </Link>
          <div className="dropdown-panel absolute top-[100px] left-0 w-full bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-12 px-12 lg:px-24">
              <div className="flex flex-col space-y-6 pt-8">
                <Link to="/shop" className="dropdown-link">Coffee</Link>
                <Link to="/shop" className="dropdown-link">Merchandise</Link>
                <Link to="/shop" className="dropdown-link">Order Online</Link>
              </div>
              <div className="w-1/2 flex justify-end">
                <img 
                  src="header-dropdown/IMG_6027.JPG" 
                  alt="Shop"
                  className="w-full max-w-lg aspect-video object-cover hover:grayscale-0 transition-all duration-700 shadow-sm rounded-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="group h-full flex items-center static">
          <Link to="/locations" className="nav-link text-xs uppercase font-medium text-[#1A1A1A]">
            LOCATION
          </Link>
          <div className="dropdown-panel absolute top-[100px] left-0 w-full bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-12 px-12 lg:px-24">
              <div className="flex flex-col space-y-6 pt-8">
                <Link to="/about" className="dropdown-link">About</Link>
                <Link to="/contact" className="dropdown-link">Inquiry</Link>
                <Link to="/locations" className="dropdown-link">Our Locations</Link>
              </div>
              <div className="w-1/2 flex justify-end">
                <img 
                  src="header-dropdown/IMG_5713.JPG" 
                  alt="Locations"
                  className="w-full max-w-lg aspect-video object-cover  hover:grayscale-0 transition-all duration-700 shadow-sm rounded-sm" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER: WORDMARK */}
      <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.jpg"
            alt="Common Time Logo"
            className="h-8 w-8 object-contain"
          />
          <div className="flex items-center gap-1 leading-[1.1]">
            <span className="font-[Bai_Jamjuree] font-light text-gray-900 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">
              COMMON
            </span>
            <span className="font-[Garet_Book] font-black italic text-gray-900/90 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">
              TIME
            </span>
          </div>
        </Link>

      {/* RIGHT: MENU & AUTH */}
      <div className="flex-1 flex items-center justify-end space-x-6 lg:space-x-10 h-full">
        <div className="hidden lg:flex group h-full flex items-center static">
          <Link to="/menu" className="nav-link text-xs uppercase font-medium text-[#1A1A1A]">
            MENU
          </Link>
          <div className="dropdown-panel absolute top-[100px] left-0 w-full bg-[#F9F7F2] border-t border-gray-100 shadow-sm min-h-[400px]">
            <div className="max-w-7xl mx-auto w-full flex items-start justify-between py-12 px-12 lg:px-24">
              <div className="flex flex-col space-y-6 pt-8">
                <Link to="/menu" className="dropdown-link">Cafe Menu</Link>
                <Link to="/shop" className="dropdown-link">Order Online</Link>
              </div>
              <div className="w-1/2 flex justify-end">
                <img 
                  src="header-dropdown/IMG_5589.JPG" 
                  alt="Menu"
                  className="w-full max-w-lg aspect-video object-cover  transition-all duration-700 shadow-sm rounded-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* AUTH LINKS */}
        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/orders" className="nav-link text-xs uppercase text-[#1A1A1A]">ORDERS</Link>
              <button onClick={() => signOut()} className="nav-link text-xs uppercase text-[#1A1A1A]">LOGOUT</button>
            </>
          ) : (
            <Link to="/login" className="nav-link text-xs uppercase text-[#1A1A1A]">LOGIN</Link>
          )}
        </div>

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

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-[#F9F7F2] z-50 flex flex-col p-8 space-y-8 animate-in fade-in slide-in-from-top-5">
          <Link to="/shop" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/locations" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Locations</Link>
          <Link to="/menu" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <div className="h-px w-full bg-gray-200 my-4" />
          {user ? (
            <>
              <Link to="/profile" className="text-xl font-bold uppercase tracking-widest text-[#1A1A1A]" onClick={() => setIsMobileMenuOpen(false)}>Profile</Link>
              <Link to="/orders" className="text-xl font-bold uppercase tracking-widest text-[#1A1A1A]" onClick={() => setIsMobileMenuOpen(false)}>Orders</Link>
              <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-left text-xl font-bold uppercase tracking-widest text-[#1A1A1A]">Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-xl font-bold uppercase tracking-widest text-[#1A1A1A]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
}