import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const response = await axios.post(
        `${BACKEND_URL}/user/signup`,
        { firstName, lastName, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Signup failed. Please try again.");
      toast.error("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-200 selection:bg-orange-500/30 overflow-x-hidden font-sans">
      
      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* --- HEADER --- */}
      <header className="relative z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/40 blur-lg rounded-full group-hover:bg-orange-500 transition-all"></div>
              <img src={logo} alt="Logo" className="relative w-10 h-10 rounded-xl border border-white/10 shadow-2xl" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              COURSEHAVEN
            </span>
          </Link>
          <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-orange-500 transition-all">
            Sign In Instead
          </Link>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center py-16 md:py-24">
        
        <div className="w-full max-w-xl">
          {/* Headline */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
              Start your journey<span className="text-orange-500">.</span>
            </h1>
            <p className="text-slate-400 font-medium">Join thousands of students mastering new skills daily.</p>
          </div>

          {/* SIGNUP CARD */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-blue-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-1000"></div>
            
            <div className="relative bg-slate-900/60 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm" />
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full px-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-white"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <div className="relative group/input">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-orange-500 transition-colors" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-white"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
                  <div className="relative group/input">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-orange-500 transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-11 pr-12 py-3.5 bg-black/40 border border-white/5 rounded-2xl focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Error Box */}
                {errorMessage && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium animate-pulse">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group/btn overflow-hidden rounded-2xl py-4 bg-orange-500 text-white font-black text-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-orange-500/50 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? "Creating Account..." : (
                      <>
                        Create Account <FaArrowRight className="text-sm group-hover/btn:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>

              {/* Footer Links */}
              <div className="mt-8 pt-6 border-t border-white/5 text-center">
                <p className="text-slate-500 text-sm font-medium">
                  By signing up, you agree to our{" "}
                  <a href="#" className="text-slate-300 hover:text-white transition underline">Terms of Service</a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center gap-6">
            <Link to="/courses" className="text-sm font-bold text-slate-500 hover:text-white transition">Explore Courses First</Link>
            <div className="w-[1px] h-4 bg-white/10"></div>
            <Link to="/help" className="text-sm font-bold text-slate-500 hover:text-white transition">Need Help?</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Signup;