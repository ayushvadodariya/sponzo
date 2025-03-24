import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-[#F9F7F7] text-[#112D4E] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
       
        <div className="flex items-center space-x-6">
          <h1 className="schoolbell-font text-4xl ml-20 text-[#3F72AF]">Sponzo</h1>
          <Link to="/campaigns" className="px-4 py-2 hover:text-[#3F72AF]">
            Campaigns
          </Link>
          <Link to="/pricing" className="px-4 py-2 hover:text-[#3F72AF]">
            Pricing
          </Link>
        </div>

      
        <div className="flex items-center space-x-6 mr-20">
         
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-[#3F72AF] text-white rounded-lg hover:bg-[#112D4E] transition"
            >
              Sign Up ▼
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-40 bg-white border border-[#DBE2EF] shadow-md rounded-lg"
                >
                  <Link
                    to="/Signup"
                    className="block px-4 py-2 text-[#112D4E] hover:bg-[#DBE2EF] transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Brand
                  </Link>
                  <Link
                    to="/Signup"
                    className="block px-4 py-2 text-[#112D4E] hover:bg-[#DBE2EF] transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Creator
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Log In Button */}
          <Link
            to="/Signin"
            className="px-4 py-2 bg-[#DBE2EF] text-[#112D4E] rounded-lg hover:bg-[#3F72AF] hover:text-white transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
