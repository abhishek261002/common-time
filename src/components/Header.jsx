import { useState } from "react";
import { FaInstagram, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartIcon from "./CartIcon";

export default function Header() {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- STITCH DESIGN TOKENS ---
  const headerStyles = "bg-[#F6F1EB] border-t-4 border-[#333333] shadow-sm";
  // Standardized height (h-11) and consistent flex behavior
  const navBlockStyles = "bg-white/40 px-6 h-11 flex items-center space-x-8 relative"; 
  const stitchNavLink = "text-[16px] tracking-[0.05em] font-[Bai_Jamjuree] text-black uppercase hover:opacity-70 transition-opacity";

  return (
    <header className={`relative z-50 ${headerStyles} h-[80px] lg:h-24 w-full flex items-center justify-between px-6 lg:px-16`}>
      <style>{`
        .nav-link-custom { position: relative; }
        .nav-link-custom::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: currentColor;
          transition: width 0.3s ease;
        }
        .group:hover .nav-link-custom::after { width: 100%; }

        .dropdown-panel {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
          pointer-events: none;
        }
        .group:hover .dropdown-panel {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
        }
        .dropdown-link {
          font-size: 25px;
          font-weight: 900;
          color: #71717a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
          line-height: 1.1;
        }
        .dropdown-link:hover { color: #1A1A1A; }
      `}</style>

      {/* 1. MOBILE MENU TOGGLE */}
      <div className="flex lg:hidden items-center">
        <button 
          className="text-[#1A1A1A] z-[60]" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 2. LEFT DESKTOP NAVIGATION - ml-6 added to match right side mr-6 */}
      <div className="hidden lg:flex flex-1 items-center h-full ml-6">
        <nav className={navBlockStyles}>
          {/* SHOP */}
          <div className="group h-full flex items-center">
            <Link to="/shop" className={`${stitchNavLink} nav-link-custom`}>SHOP</Link>
            <div className="dropdown-panel absolute top-full left-0 mt-0 w-[450px] bg-[#FAF7F3]  px-4 pt-15 pb-2 flex justify-between items-end shadow-sm z-50">
              <div className="flex flex-col space-y-1 font-[Garet_Book]">
                <Link to="/orders" className="dropdown-link">My Orders</Link>
                <Link to="/profile" className="dropdown-link">Profile</Link>
                <Link to="/shop" className="dropdown-link">Order Online</Link>
              </div>
              <div className="w-32 h-44 overflow-hidden">
                <img src="header-dropdown/IMG_6027.JPG" alt="Shop" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* LOCATIONS */}
          <div className="group h-full flex items-center">
            <Link to="#" className={`${stitchNavLink} nav-link-custom`}>LOCATIONS</Link>
            <div className="dropdown-panel absolute top-full left-0 mt-0 w-[450px] bg-[#FAF7F3] px-4 pt-15 pb-2 flex justify-between items-end shadow-sm z-50">
              <div className="flex flex-col space-y-1 font-light font-[Garet_Book]">
                <Link to="locations/lodhi-colony" className="dropdown-link">Lodhi Colony</Link>
                <Link to="/locations/vasant-vihar" className="dropdown-link">Vasant vihar</Link>
                <Link to="/locations/khan-market" className="dropdown-link">Khan market</Link>
              </div>
              <div className="w-32 h-44 overflow-hidden">
                <img src="header-dropdown/IMG_5713.JPG" alt="Locations" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* 3. CENTER LOGO */}
      <Link to="/" className="flex items-center gap-2 px-4 shrink-0">
        <img src="/logo.jpg" alt="Common Time Logo" className="h-8 w-8 object-contain" />
        <div className="flex items-center gap-1 leading-[1.1]">
          <span className="font-[Bai_Jamjuree] font-light text-gray-900 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">COMMON</span>
          <span className="font-[Garet_Book] font-black italic text-gray-900/90 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-[32px]">TIME</span>
        </div>
      </Link>

      {/* 4. RIGHT NAVIGATION & UTILITIES */}
      <div className="flex flex-1 items-center justify-end h-full">
        <nav className={`hidden lg:flex ${navBlockStyles} mr-6`}>
          {/* MENU - Button removed to match left side text-only links */}
          <div className="group h-full flex items-center">
            <Link to="/" className={`${stitchNavLink} nav-link-custom`}>
              MENU
            </Link>
            <div className="dropdown-panel absolute top-full right-0 mt-0 w-[450px] bg-[#FAF7F3] px-4 pt-15 pb-2 flex justify-between items-end shadow-sm z-50">
              <div className="flex flex-col space-y-1 font-[Garet_Book]">
                <Link to="/menu" className="dropdown-link text-3xl">Cafe Menu</Link>
                <Link to="/shop" className="dropdown-link text-3xl">Order</Link>
              </div>
              <div className="w-32 h-44 overflow-hidden">
                <img src="header-dropdown/IMG_5589.JPG" alt="Menu" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* AUTH */}
          <div className="flex items-center h-full">
            {user ? (
              <button onClick={() => signOut()} className={`${stitchNavLink} nav-link-custom`}>LOGOUT</button>
            ) : (
              <Link to="/login" className={`${stitchNavLink} nav-link-custom`}>LOGIN</Link>
            )}
          </div>
        </nav>

        {/* UTILITY ICONS */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <CartIcon />
          <a href="https://www.instagram.com/itscommontime" target="_blank" rel="noreferrer" className="text-[#1A1A1A] hover:opacity-70 transition-opacity">
            <FaInstagram size={18} />
          </a>
        </div>
      </div>

      {/* 5. MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[80px] bg-[#F9F7F2] z-50 flex flex-col p-8 space-y-8 animate-in fade-in slide-in-from-top-5">
          <Link to="/shop" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/locations" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Locations</Link>
          <Link to="/menu" className="text-4xl font-light uppercase tracking-tighter text-[#666666]" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <div className="h-px w-full bg-gray-200 my-4" />
          {user ? (
            <button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} className="text-left text-xl font-bold uppercase tracking-widest text-[#1A1A1A]">Logout</button>
          ) : (
            <Link to="/login" className="text-xl font-bold uppercase tracking-widest text-[#1A1A1A]" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </header>
  );
}