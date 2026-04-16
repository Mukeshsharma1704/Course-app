import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import { FaTrash, FaEdit, FaArrowLeft, FaPlus, FaTag } from "react-icons/fa";

function OurCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = admin?.token;

  useEffect(() => {
    if (!token) {
      toast.error("Access Denied. Please login.");
      navigate("/admin/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to sync inventory");
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to decommission this course?")) return;

    try {
      const response = await axios.delete(`${BACKEND_URL}/course/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      toast.success(response.data.message || "Course removed.");
      setCourses(courses.filter((course) => course._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.errors || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-slate-900/50 rounded-[2rem] animate-pulse border border-white/5"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden py-16 px-6 md:px-12">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 font-bold text-xs uppercase tracking-widest group">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Dashboard
            </Link>
            <h1 className="text-5xl font-black text-white tracking-tight">Course <span className="text-blue-500">Inventory</span></h1>
            <p className="text-slate-400 mt-2 font-medium">Manage and audit your deployed educational modules.</p>
          </div>
          
          <Link to="/admin/create-course" className="bg-white text-black px-8 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-blue-500 hover:text-white transition-all shadow-xl active:scale-95">
            <FaPlus size={14} /> Create New Module
          </Link>
        </div>

        {/* Grid Display */}
        {courses.length === 0 ? (
          <div className="py-20 text-center bg-slate-900/20 border border-dashed border-white/10 rounded-[3rem]">
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active courses found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course._id} className="group bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl hover:border-white/10 transition-all">
                
                {/* Image Wrap */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={course?.image?.url}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-blue-400 font-black text-sm">₹{course.price}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  <h2 className="text-xl font-black text-white mb-3 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                    {course.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between gap-4 pt-6 border-t border-white/5">
                    <Link
                      to={`/admin/update-course/${course._id}`}
                      className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                      <FaEdit size={14} className="text-blue-400" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/10"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OurCourses;