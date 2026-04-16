import React, { useState } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!email || !password) {
      setErrorMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/user/login`,
        { email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response?.data?.errors || "Login failed");
      toast.error(error.response?.data?.errors || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030712] text-slate-200 selection:bg-primary/30 overflow-hidden font-sans">
      
      {/* --- NEXT-GEN BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>

      {/* --- PREMIUM HEADER --- */}
      <header className="relative z-50 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full group-hover:bg-primary transition-all"></div>
                <img src={logo} alt="Logo" className="relative w-10 h-10 rounded-xl border border-white/10" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/50 bg-clip-text text-transparent">
              COURSEHAVEN
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
             <Link to="/signup" className="text-sm font-medium text-slate-400 hover:text-white transition">Sign Up</Link>
             <Link to="/courses" className="px-5 py-2.5 bg-white text-black rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Browse Library
             </Link>
          </nav>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-20">
        
        <div className="w-full max-w-lg">
          {/* Typography Section */}
          <div className="text-center mb-10 space-y-3">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              Welcome back<span className="text-primary">.</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-sm mx-auto font-medium">
              The next generation of learning starts here.
            </p>
          </div>

          {/* NEXT-GEN GLASS CARD */}
          <div className="group relative">
            {/* Ambient Glow behind card */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-slate-900/40 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 md:p-12 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Modern Input Group: Email */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Endpoint</label>
                  <div className="relative group/input">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@nexus.com"
                      className="w-full pl-12 pr-4 py-4 bg-black/40 border border-white/5 rounded-2xl focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-white placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Modern Input Group: Password */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Security Key</label>
                        <a href="#" className="text-xs font-bold text-primary hover:text-accent transition">Forgot?</a>
                    </div>
                  <div className="relative group/input">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/input:text-primary transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-black/40 border border-white/5 rounded-2xl focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-white placeholder:text-slate-600"
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

                {/* Status Messaging */}
                {errorMessage && (
                  <div className="animate-shake bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                    {errorMessage}
                  </div>
                )}

                {/* High-Impact Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full group/btn overflow-hidden rounded-2xl py-4 bg-white text-black font-black text-lg transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors">
                    {loading ? "Authenticating..." : (
                        <>
                            Log Into System <FaArrowRight className="text-sm" />
                        </>
                    )}
                  </span>
                </button>
              </form>

              <div className="mt-8 flex items-center gap-4">
                <div className="h-[1px] flex-1 bg-white/5"></div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">System Access</span>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>

              <Link
                to="/courses"
                className="mt-6 flex items-center justify-center w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-slate-300 font-bold hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Enter as Guest Interface
              </Link>
            </div>
          </div>

          <p className="mt-10 text-center text-slate-500 font-medium">
            New to the ecosystem?{" "}
            <Link to="/signup" className="text-white hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30">
              Create a free account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Login;