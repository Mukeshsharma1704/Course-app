import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import { FaArrowLeft, FaCloudUploadAlt, FaSave, FaMagic } from "react-icons/fa";

function UpdateCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/course/${id}`, {
          withCredentials: true,
        });
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPrice(data.course.price);
        setImage(data.course.image.url);
        setImagePreview(data.course.image.url);
        setLoading(false);
      } catch (error) {
        toast.error("Resource fetch failed");
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
    }
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    setUpdating(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);

    if (image instanceof File) {
      formData.append("image", image);
    }

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;

    if (!token) {
      toast.error("Authorization required");
      setUpdating(false);
      return;
    }

    try {
      const response = await axios.put(
        `${BACKEND_URL}/course/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course synchronized.");
      navigate("/admin/our-courses");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-black text-xs uppercase tracking-widest">Fetching Assets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden py-16 px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/admin/our-courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 font-bold text-sm group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Inventory
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Metadata */}
          <div className="lg:w-1/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
              <FaMagic /> Editor Mode
            </div>
            <h1 className="text-4xl font-black text-white leading-tight mb-4">Refine Content.</h1>
            <p className="text-slate-400 font-medium mb-8">Updating: <span className="text-slate-200 italic">"{title}"</span></p>
            
            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
              <p className="text-xs text-slate-500 font-bold leading-relaxed">
                Modifying this course will update it for all current and future students. Ensure all prices and curriculum details are accurate before saving changes.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-2/3">
            <form onSubmit={handleUpdateCourse} className="space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                
                <div className="space-y-6">
                  {/* Image Section First - Visibility is key for updates */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Hero Asset</label>
                    <div className="relative group overflow-hidden rounded-[2rem] border-2 border-white/5 bg-slate-950/50 p-2">
                      <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner">
                        <img 
                          src={imagePreview || "/imgPL.webp"} 
                          alt="Preview" 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition-all backdrop-blur-sm">
                          <div className="text-center">
                            <FaCloudUploadAlt className="mx-auto text-3xl text-blue-400 mb-2" />
                            <span className="text-white font-black text-xs uppercase tracking-widest">Replace Artwork</span>
                          </div>
                          <input type="file" onChange={changePhotoHandler} accept="image/*" className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Course Identity</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Valuation (₹)</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Curriculum Update</label>
                    <textarea
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={updating}
                  className="w-full mt-10 bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                >
                  {updating ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Save Changes <FaSave /></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateCourse;