import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo.webp";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_URL } from "../utils/utils";
import { FaPlus, FaBookOpen, FaHome, FaSignOutAlt, FaChartLine, FaUsers, FaLayerGroup } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message || "Logged out of Command Center");
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Logout failed");
    }
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-100 overflow-hidden font-sans">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* --- NEXT-GEN SIDEBAR --- */}
      <aside className="w-72 bg-black/40 backdrop-blur-3xl border-r border-white/5 p-8 flex flex-col z-10">
        <div className="flex items-center flex-col mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img src={logo} alt="Admin" className="relative rounded-2xl h-20 w-20 border border-white/10 shadow-2xl object-cover" />
          </div>
          <h2 className="text-xl font-black mt-4 tracking-tight">Admin Portal</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Superuser Access</p>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarLink to="/admin/our-courses" icon={<FaBookOpen />} label="Our Courses" color="hover:text-blue-400" />
          <SidebarLink to="/admin/create-course" icon={<FaPlus />} label="Create Course" color="hover:text-emerald-400" />
          <SidebarLink to="/" icon={<FaHome />} label="View Site" color="hover:text-slate-300" />
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 w-full p-4 rounded-2xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold group"
          >
            <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" /> 
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <main className="flex-1 relative z-10 p-12 overflow-y-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
            Welcome, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{adminData?.admin?.firstName || "Admin"}</span>
          </h1>
          <p className="text-slate-400 font-medium">Here's what's happening across your platform today.</p>
        </header>

        {/* --- STAT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <StatCard icon={<FaUsers />} label="Total Students" value="1,284" trend="+12%" />
          <StatCard icon={<FaLayerGroup />} label="Active Courses" value="24" trend="+2" />
          <StatCard icon={<FaChartLine />} label="Revenue" value="₹14,350" trend="+18%" />
        </div>

        {/* --- WELCOME AREA --- */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6">
            <FaHome size={32} />
          </div>
          <h3 className="text-2xl font-black text-white mb-4">Command Center Active</h3>
          <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
            Your administrative tools are ready. You can manage existing content or deploy new modules to the student network.
          </p>
          <div className="mt-8 flex gap-4">
             <Link to="/admin/create-course" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
               + Deploy New Course
             </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

// Sub-component for Sidebar Links
function SidebarLink({ to, icon, label, color }) {
  return (
    <Link to={to}>
      <button className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-slate-400 transition-all hover:bg-white/5 ${color}`}>
        <span className="text-lg">{icon}</span>
        {label}
      </button>
    </Link>
  );
}

// Sub-component for Dashboard Stats
function StatCard({ icon, label, value, trend }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-8 rounded-[2rem] backdrop-blur-xl">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-white/5 rounded-xl text-blue-400">{icon}</div>
        <span className="text-emerald-400 text-xs font-black">{trend}</span>
      </div>
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{label}</p>
      <h4 className="text-3xl font-black text-white mt-1">{value}</h4>
    </div>
  );
}

export default Dashboard;