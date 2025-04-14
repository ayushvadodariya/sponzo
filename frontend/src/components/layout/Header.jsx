import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [creatorsOpen, setCreatorsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  return (
    <header className="bg-[#F9F7F7] text-[#112D4E] p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className=" text-4xl text-[#3F72AF] ml-17">Sponzo</h1>

        {/* Center Navigation */}
        <div className="flex items-center gap-8">
          {/* Creators Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCreatorsOpen(!creatorsOpen)}
              className="flex items-center gap-1 hover:text-[#3F72AF]"
            >
              FOR CREATORS <span className="text-xs">▼</span>
            </button>
            {creatorsOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#DBE2EF] rounded-md shadow-lg py-2">
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-[#DBE2EF] text-[#112D4E]"
                >
                  Sign Up
                </Link>
                <Link
                  to="/pricing"
                  className="block px-4 py-2 hover:bg-[#DBE2EF] text-[#112D4E]"
                >
                  Pricing
                </Link>
              </div>
            )}
          </div>

          {/* Brands Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBrandsOpen(!brandsOpen)}
              className="flex items-center gap-1 hover:text-[#3F72AF]"
            >
              FOR BRANDS <span className="text-xs">▼</span>
            </button>
            {brandsOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#DBE2EF] rounded-md shadow-lg py-2">
                <Link
                  to="/signup"
                  className="block px-4 py-2 hover:bg-[#DBE2EF] text-[#112D4E]"
                >
                  Sign Up
                </Link>
                <Link
                  to="/pricing"
                  className="block px-4 py-2 hover:bg-[#DBE2EF] text-[#112D4E]"
                >
                  Pricing
                </Link>
              </div>
            )}
          </div>

          <Link to="/pricing" className="hover:text-[#3F72AF]">
            PRICING
          </Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 mr-17">
          <Link
            to="/signin"
            className="px-4 py-2 rounded-lg bg-[#DBE2EF] text-[#112D4E] hover:bg-[#3F72AF] hover:text-white transition"
          >
            LOGIN
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 rounded-lg bg-[#3F72AF] text-white hover:bg-[#112D4E] transition"
          >
            GET ACCESS
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
