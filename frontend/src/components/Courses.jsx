import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCircleUser, FaRegStar } from "react-icons/fa6";
import { RiHome2Fill, RiDashboardFill } from "react-icons/ri";
import { FaDiscourse, FaDownload, FaArrowRight } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("fetchCourses Error:", error);
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error logging out");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Filter courses based on search
  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-orange-500/30">
      
      {/* Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/40 md:hidden" 
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Dynamic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Hamburger for Mobile */}
      <button
        className="md:hidden fixed top-6 right-6 z-50 p-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Glassmorphic Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col z-40 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-12 group cursor-pointer">
          <div className="relative">
             <div className="absolute inset-0 bg-orange-500/40 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <img src={logo} alt="Logo" className="relative h-12 w-12 rounded-2xl border border-white/10" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            COURSEHAVEN
          </span>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <SidebarItem icon={<RiHome2Fill />} label="Home" href="/" />
            <SidebarItem icon={<FaDiscourse />} label="Courses" href="#" active />
            <SidebarItem icon={<RiDashboardFill />} label="Purchases" href="/purchases" />
            <SidebarItem icon={<IoMdSettings />} label="Settings" href="#" />
          </ul>
        </nav>

        <div className="pt-8 border-t border-white/5">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold"
            >
              <IoLogOut size={22} /> Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-3 w-full p-4 rounded-2xl bg-orange-500 text-black hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all font-black text-center justify-center"
            >
              <IoLogIn size={22} /> Login
            </Link>
          )}
        </div>
      </aside>

      {/* Main Content Hub */}
      <main className="flex-1 relative z-10 md:ml-72 overflow-y-auto px-6 md:px-12 py-8">
        
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-2">Explore Library</h1>
            <p className="text-slate-400 font-medium">Elevate your skills with next-gen modules.</p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                placeholder="Search premium courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 transition-all text-sm font-medium"
              />
            </div>
            <div className="p-1 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
               <div className="bg-slate-950 p-2 rounded-[14px]">
                  <FaCircleUser className="text-2xl text-white" />
               </div>
            </div>
          </div>
        </header>

        {/* Courses Section */}
        <section>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white/5 rounded-[2.5rem] animate-pulse"></div>
              ))}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/5 border-dashed">
              <p className="text-slate-500 font-bold text-lg">No intelligence found for this query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <PremiumCourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// Sub-component for Sidebar Items
function SidebarItem({ icon, label, href, active }) {
  return (
    <li>
      <a
        href={href}
        className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
          active 
            ? "bg-white/10 text-orange-500 border border-white/10 shadow-xl" 
            : "text-slate-500 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className="text-xl">{icon}</span>
        {label}
      </a>
    </li>
  );
}

// Premium Next-Gen Course Card
function PremiumCourseCard({ course }) {
  return (
    <div className="group relative bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl hover:border-orange-500/50 hover:shadow-[0_0_40px_rgba(249,115,22,0.15)] transition-all duration-500 flex flex-col">
      
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden bg-slate-800">
        <img
          loading="lazy"
          src={course.image?.url || "https://via.placeholder.com/500x400?text=Course"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
        <div className="absolute top-5 left-5 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-orange-500">
           Bestseller
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => <FaRegStar key={i} size={12} />)}
          </div>
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">Premium Module</span>
        </div>

        <h2 className="text-xl font-black text-white mb-3 group-hover:text-orange-500 transition-colors leading-tight">
          {course.title}
        </h2>
        
        <p className="text-slate-400 text-sm font-medium line-clamp-2 mb-6 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-6">
            <div className="flex flex-col">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Investment</span>
              <span className="text-2xl font-black text-white">₹{course.price}</span>
            </div>
            <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-lg text-xs font-black">
              20% OFF
            </div>
          </div>

          <Link
            to={`/buy/${course._id}`}
            className="group/btn relative w-full h-14 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-2 overflow-hidden transition-all active:scale-[0.98] hover:bg-orange-500 hover:text-white"
          >
            <span className="relative z-10 flex items-center gap-2">
              Secure Access <FaArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Courses;