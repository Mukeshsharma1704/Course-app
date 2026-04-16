import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaDiscourse, FaDownload, FaArrowRight, FaRocket } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { RiHome2Fill, RiDashboardFill } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import logo from "../../public/logo.webp";

function Purchases() {
  const [purchases, setPurchase] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/user/purchases`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPurchase(response.data.courseData || []);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("System failed to retrieve purchase history.");
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchPurchases();
  }, [token]);

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/user/logout`, { withCredentials: true });
      toast.success("Logged out from the neural network.");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      toast.error("Logout interruption detected.");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30">
      {/* --- AMBIENT BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50"></div>
      </div>

      {/* --- MOBILE TOGGLE --- */}
      <button
        className="md:hidden fixed top-6 left-6 z-[60] p-3 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl text-white"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* --- NEXT-GEN SIDEBAR --- */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-black/40 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col z-50 transition-transform duration-500 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center gap-3 mb-12 group">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-xl border border-white/10 shadow-lg" />
          <span className="text-xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            COURSEHAVEN
          </span>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            <SidebarItem icon={<RiHome2Fill />} label="Home" to="/" />
            <SidebarItem icon={<FaDiscourse />} label="Courses" to="/courses" />
            <SidebarItem icon={<RiDashboardFill />} label="My Learning" to="/purchases" active />
            <SidebarItem icon={<IoMdSettings />} label="Settings" to="#" />
          </ul>
        </nav>

        <div className="pt-8 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-4 rounded-2xl bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all font-bold group"
          >
            <IoLogOut size={22} className="group-hover:-translate-x-1 transition-transform" /> 
            Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT HUB --- */}
      <main className="flex-1 relative z-10 md:ml-72 p-6 md:p-12 overflow-y-auto">
        <header className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
            <FaRocket /> Student Dashboard
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">My Purchases</h1>
          <p className="text-slate-400 font-medium">Continue your journey through the digital modules you've acquired.</p>
        </header>

        {/* Error Handling */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-bold mb-8 text-center backdrop-blur-md">
            {errorMessage}
          </div>
        )}

        {/* Grid Content */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-white/5 rounded-[2.5rem] animate-pulse"></div>
            ))}
          </div>
        ) : purchases.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {purchases.map((purchase, index) => (
              <PurchaseCard key={index} item={purchase} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded-[3rem] border border-white/5 border-dashed">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6 text-slate-500">
               <FaDownload size={32} />
            </div>
            <p className="text-slate-400 font-bold text-lg">Your library is currently empty.</p>
            <Link to="/courses" className="mt-4 text-blue-400 font-bold hover:text-white transition">Browse the Catalog →</Link>
          </div>
        )}
      </main>
    </div>
  );
}

// Side-component for clean Navigation
function SidebarItem({ icon, label, to, active }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${
          active 
            ? "bg-white/10 text-blue-400 border border-white/10 shadow-xl" 
            : "text-slate-500 hover:text-white hover:bg-white/5"
        }`}
      >
        <span className="text-xl">{icon}</span>
        {label}
      </Link>
    </li>
  );
}

// Next-Gen Card for Purchases
function PurchaseCard({ item }) {
  return (
    <div className="group relative bg-slate-900/40 border border-white/10 rounded-[2.5rem] overflow-hidden backdrop-blur-xl hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(37,99,235,0.1)] transition-all duration-500 flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image?.url || "https://via.placeholder.com/400"}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-slate-400 text-xs font-medium line-clamp-2 mb-6 leading-relaxed">
          {item.description}
        </p>

        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Ownership</span>
            <span className="text-blue-400 font-black text-sm">₹{item.price}</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-all shadow-lg">
            <FaArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Purchases;