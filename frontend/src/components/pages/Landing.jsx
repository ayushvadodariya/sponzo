import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { NavLink, useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/src/assets/back1.jpg')" }}
    >
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-7xl font-extrabold text-[#112D4E]">
            Get Social.
            <br /> Get Sponsored.
          </h2>
          <br />
          <p className="text-lg text-[#3F72AF] mb-8">
            Where Creators Meet Opportunities & Brands Discover Authentic
            Voices.
          </p>

          <div className="flex justify-center gap-6">
            <button 
            onClick={() => navigate("/signup")}
            className="bg-[#3F72AF] text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-[#112D4E] transition duration-200 shadow-md cursor-pointer">
              Join as Brand
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="border border-[#3F72AF] text-[#3F72AF] px-8 py-3 rounded-md text-lg font-medium hover:bg-[#3F72AF] hover:text-white transition duration-200 shadow-md cursor-pointer"
            >
              Join as Creator
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Landing;
