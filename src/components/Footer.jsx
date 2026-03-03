import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Placeholder - no backend
    setEmail("");
  };

  return (
    <footer className="bg-[#fafaf8] py-10 md:py-14 text-gray-900 text-sm border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/terms" className="hover:underline text-gray-600">
            Terms & Conditions
          </Link>
          <Link to="/shop" className="hover:underline text-gray-600">
            Shop
          </Link>
          <Link to="/locations" className="hover:underline text-gray-600">
            Locations
          </Link>
          <Link to="/about" className="hover:underline text-gray-600">
            About
          </Link>
        </div>
        <form
          onSubmit={handleNewsletterSubmit}
          className="flex gap-2"
        >
          <input
            type="email"
            placeholder="Newsletter (placeholder)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded text-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 rounded text-sm hover:bg-gray-200"
          >
            Subscribe
          </button>
        </form>
      </div>
      <p className="text-center mt-6 text-gray-500">
        © {new Date().getFullYear()} Common Time • All rights reserved
      </p>
    </footer>
  );
}
