import React, { useEffect, useState, lazy, Suspense } from "react";
import logo from "../../public/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaArrowRight, FaStar, FaPlayCircle, FaShieldAlt, FaRocket } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Slider = lazy(() => import("react-slick"));

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success("Logged out successfully");
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.23, 1, 0.32, 1)",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2.5 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-primary/30 overflow-x-hidden font-sans">
      
      {/* --- PREMIUM BACKGROUND ELEMENTS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[0%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      {/* --- NEXT-GEN NAVBAR --- */}
      <header className="sticky top-0 z-[100] bg-black/40 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/40 blur-md rounded-lg group-hover:bg-primary transition-all duration-500"></div>
                <img src={logo} alt="Logo" className="relative w-10 h-10 rounded-xl border border-white/10" />
            </div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent">
              COURSEHAVEN
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/courses" className="hidden md:block text-sm font-bold text-slate-400 hover:text-white transition">Catalog</Link>
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/purchases" className="text-sm font-bold text-slate-400 hover:text-white transition">My Hub</Link>
                <button onClick={handleLogout} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-500/20 hover:text-red-400 transition-all">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-300 hover:text-white transition">Login</Link>
                <Link to="/signup" className="px-6 py-2.5 bg-primary text-black rounded-full text-sm font-black shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:scale-105 active:scale-95 transition-all">
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-widest mb-8 animate-bounce">
            <FaRocket className="text-[10px]" /> Evolution of Learning
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            UNLEASH YOUR <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-accent bg-clip-text text-transparent">DIGITAL GENIUS.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium mb-12">
            Join a premium ecosystem of creators and engineers. Master the technologies that are shaping the next century.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/courses" className="w-full sm:w-auto px-10 py-5 bg-white text-black text-lg font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all active:scale-95">
              Browse Library <FaArrowRight />
            </Link>
            <button className="flex items-center gap-3 text-white font-bold hover:text-primary transition group">
              <FaPlayCircle size={40} className="text-primary group-hover:scale-110 transition-transform" />
              Watch Experience
            </button>
          </div>
        </div>
      </section>

      {/* --- HORIZONTAL PREMIUM COURSES --- */}
      <section className="relative z-10 py-24 bg-white/[0.02] border-y border-white/5 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">PREMIUM DROPS</h2>
              <p className="text-slate-500 font-medium">The latest industry-standard curricula, curated for excellence.</p>
            </div>
            <Link to="/courses" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View All Modules <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="h-[500px] bg-white/5 rounded-3xl animate-pulse"></div>
               ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --- BENTO STATS SECTION --- */}
      <section className="relative z-10 py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: "5K+", label: "Elite Students", icon: <FaStar />, color: "from-orange-500" },
            { num: "50+", label: "World-Class Mentors", icon: <FaShieldAlt />, color: "from-primary" },
            { num: "100%", label: "Curated Content", icon: <FaPlayCircle />, color: "from-purple-500" },
          ].map((stat, i) => (
            <div key={i} className="group relative p-10 rounded-[2rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <div className={`absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity text-2xl`}>{stat.icon}</div>
              <div className="text-5xl font-black mb-2 text-white">{stat.num}</div>
              <div className="text-slate-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
              <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r ${stat.color} to-transparent transition-all duration-700`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 pt-32 pb-12 border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3 mb-8">
                <img src={logo} alt="Logo" className="w-10 h-10 rounded-xl" />
                <span className="text-2xl font-black tracking-tighter">COURSEHAVEN</span>
              </div>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                Building the infrastructure for the next generation of global talent. Join the elite.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaTwitter, FaInstagram].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-black transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
               <div>
                  <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Ecosystem</h4>
                  <ul className="space-y-4 text-slate-500 font-medium text-sm">
                    <li><a href="#" className="hover:text-primary transition">The Library</a></li>
                    <li><a href="#" className="hover:text-primary transition">Student Hub</a></li>
                    <li><a href="#" className="hover:text-primary transition">Certifications</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Company</h4>
                  <ul className="space-y-4 text-slate-500 font-medium text-sm">
                    <li><a href="#" className="hover:text-primary transition">Our Vision</a></li>
                    <li><a href="#" className="hover:text-primary transition">Careers</a></li>
                    <li><a href="#" className="hover:text-primary transition">Blog</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-[0.2em]">Legal</h4>
                  <ul className="space-y-4 text-slate-500 font-medium text-sm">
                    <li><a href="#" className="hover:text-primary transition">Privacy Protocol</a></li>
                    <li><a href="#" className="hover:text-primary transition">Terms of Access</a></li>
                  </ul>
               </div>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 text-center md:text-left flex flex-col md:flex-row justify-between text-slate-600 text-sm font-bold">
            <p>© 2026 COURSEHAVEN ECOSYSTEM. ALL RIGHTS SECURED.</p>
            <p className="mt-4 md:mt-0 uppercase tracking-widest">Designed for the future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CourseCard({ course }) {
  return (
    <Link to={`/buy/${course._id}`} className="block group h-full">
      <div className="relative h-full bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl group-hover:bg-slate-900/60 group-hover:border-primary/50 transition-all duration-500 flex flex-col">
        
        {/* Image Hub */}
        <div className="relative h-64 overflow-hidden">
          <img
            loading="lazy"
            src={course.image?.url || "https://via.placeholder.com/800x600"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
          <div className="absolute top-6 right-6 bg-white text-black px-4 py-1.5 rounded-full text-sm font-black shadow-xl">
            ₹{course.price}
          </div>
        </div>

        {/* Content Hub */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-4">
             <div className="flex text-primary gap-0.5">
                {[...Array(5)].map((_, i) => <FaStar key={i} size={10} />)}
             </div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Verified Course</span>
          </div>
          
          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-slate-400 text-sm font-medium mb-8 line-clamp-2 flex-grow leading-relaxed">
            {course.description}
          </p>

          <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-slate-500">View Module</span>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
               <FaArrowRight className="text-sm" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Home;