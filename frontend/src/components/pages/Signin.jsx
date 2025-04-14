import React from "react";
import googleIcon from "../../assets/google.png";

function Signin() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9F7F7]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center border border-[#DBE2EF]">
        <h2 className="text-2xl font-bold text-[#112D4E] mb-2">Welcome Back</h2>
        <p className="text-[#3F72AF] mb-6">Login to your account</p>

        {/* Google Sign In Button */}
        <button
          onClick={() => (window.location.href = "/api/auth/google")}
          className="w-full mb-4 flex items-center justify-center gap-2 bg-white border border-[#DBE2EF] text-gray-700 py-2 rounded-md hover:bg-gray-50 transition duration-200"
        >
          <img src={googleIcon} alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#DBE2EF]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full px-4 py-2 border border-[#DBE2EF] rounded-md focus:outline-none focus:ring focus:ring-[#3F72AF]"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-[#DBE2EF] rounded-md focus:outline-none focus:ring focus:ring-[#3F72AF]"
          />
          <button
            type="submit"
            className="w-full bg-[#3F72AF] text-white py-2 rounded-md hover:bg-[#112D4E] transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm">
          <a href="#" className="text-[#3F72AF] hover:text-[#112D4E]">
            Forgot Password?
          </a>
          <p className="mt-2 text-gray-600">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#3F72AF] hover:text-[#112D4E] font-medium"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
