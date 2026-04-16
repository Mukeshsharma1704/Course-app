import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { BACKEND_URL } from "../utils/utils";
import { FaImage, FaArrowLeft, FaCloudUploadAlt, FaRocket } from "react-icons/fa";

function CourseCreate() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImagePreview(reader.result);
        setImage(file);
      };
    } else {
      toast.error("Please select a valid image file");
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    if (!title || !description || !price || !image) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    const admin = JSON.parse(localStorage.getItem("admin"));
    const token = admin?.token;
    
    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/course/create`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      toast.success(response.data.message || "Course deployed successfully");
      navigate("/admin/our-courses");
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error creating course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans relative overflow-hidden py-16 px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb / Back Navigation */}
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-8 font-bold text-sm group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left: Info Section */}
          <div className="lg:w-1/3">
            <h2 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-2">Content Studio</h2>
            <h1 className="text-4xl font-black text-white leading-tight mb-6">Create New Module.</h1>
            <p className="text-slate-400 font-medium leading-relaxed">
              Fill in the parameters to deploy a new course to the network. Ensure your description is engaging to maximize conversion.
            </p>
            
            <div className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0"><FaRocket size={14} /></div>
                <p className="text-xs text-slate-500 font-semibold italic">Courses are published instantly after creation.</p>
              </div>
            </div>
          </div>

          {/* Right: Form Section */}
          <div className="lg:w-2/3">
            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
                
                {/* Inputs Grid */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Course Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Masterclass in Neural Networks"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Price (USD)</label>
                      <input
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Curriculum Description</label>
                    <textarea
                      rows="4"
                      placeholder="What will students achieve?"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-950/50 border border-white/5 rounded-2xl px-5 py-4 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all font-medium resize-none"
                    />
                  </div>

                  {/* Enhanced Image Upload */}
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3 ml-1">Cover Artwork</label>
                    <div className="relative group">
                      <div className={`border-2 border-dashed rounded-[2rem] p-4 transition-all ${imagePreview ? 'border-blue-500/50 bg-blue-500/5' : 'border-white/5 bg-slate-950/30 hover:border-blue-500/30'}`}>
                        {imagePreview ? (
                          <div className="relative aspect-video rounded-2xl overflow-hidden">
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center cursor-pointer transition-opacity backdrop-blur-sm">
                              <span className="text-white font-black text-sm flex items-center gap-2"><FaCloudUploadAlt /> Change Image</span>
                              <input type="file" onChange={changePhotoHandler} accept="image/*" className="hidden" />
                            </label>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center py-10 cursor-pointer">
                            <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                              <FaImage size={24} />
                            </div>
                            <span className="text-sm font-bold text-slate-400">Click to upload banner</span>
                            <span className="text-[10px] text-slate-600 mt-1 uppercase tracking-tighter font-black">PNG, JPG, WEBP up to 5MB</span>
                            <input type="file" onChange={changePhotoHandler} accept="image/*" className="hidden" />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-10 bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>Publish Course <FaRocket /></>
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

export default CourseCreate;