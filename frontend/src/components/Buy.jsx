import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { BACKEND_URL } from "../utils/utils";
import { FaShieldAlt, FaLock, FaCreditCard, FaArrowLeft } from "react-icons/fa";

function Buy() {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [course, setCourse] = useState({});
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchBuyCourseData = async () => {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/course/buy/${courseId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        setCourse(response.data.course);
        setClientSecret(response.data.clientSecret);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error?.response?.status === 400) {
          setError("You have already purchased this course");
          setTimeout(() => navigate("/purchases"), 2000);
        } else {
          setError(error?.response?.data?.errors || "Initialization failed");
        }
      }
    };
    fetchBuyCourseData();
  }, [courseId, token, navigate]);

  const handlePurchase = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const card = elements.getElement(CardElement);
    if (card == null) {
      setLoading(false);
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: `${user?.user?.firstName || "Customer"}`,
          email: user?.user?.email,
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      const paymentInfo = {
        email: user?.user?.email,
        userId: user.user._id,
        courseId: courseId,
        paymentId: paymentIntent.id,
        amount: paymentIntent.amount,
        status: paymentIntent.status,
      };

      try {
        await axios.post(`${BACKEND_URL}/order`, paymentInfo, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        toast.success("Access Granted! Course added to library.");
        navigate("/purchases");
      } catch (err) {
        toast.error("Payment recorded, but sync failed. Contact support.");
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans py-12 px-6">
      {/* Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <Link to="/courses" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-10 font-bold text-sm">
          <FaArrowLeft /> Back to Courses
        </Link>

        {error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] text-center backdrop-blur-xl">
            <h2 className="text-2xl font-black text-red-400 mb-4">{error}</h2>
            <Link to="/purchases" className="inline-block bg-white text-black px-8 py-3 rounded-xl font-black">Go to Dashboard</Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Order Summary */}
            <div className="flex-1">
              <h2 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-2">Checkout Summary</h2>
              <h1 className="text-4xl font-black text-white mb-8">Ready to start?</h1>
              
              <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 backdrop-blur-xl">
                <div className="flex items-start gap-6 mb-8">
                  <img src={course.image?.url} alt={course.title} className="w-24 h-24 rounded-2xl object-cover border border-white/10" />
                  <div>
                    <h3 className="text-xl font-black text-white">{course.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">Lifetime Digital Access</p>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-500">Course Price</span>
                    <span className="text-white">₹{course.price}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-slate-500">Platform Fee</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-black text-white">Total Investment</span>
                    <span className="text-3xl font-black text-indigo-400">₹{course.price}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-6 px-4">
                 <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <FaShieldAlt className="text-indigo-500" /> SSL Secured
                 </div>
                 <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <FaLock className="text-indigo-500" /> Encrypted
                 </div>
              </div>
            </div>

            {/* Right Column: Payment Terminal */}
            <div className="w-full lg:w-[400px]">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl text-slate-900">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                    <FaCreditCard />
                  </div>
                  <h2 className="text-xl font-black tracking-tight">Payment Terminal</h2>
                </div>

                <form onSubmit={handlePurchase}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Card Information
                  </label>
                  <div className="p-4 border-2 border-slate-100 rounded-2xl focus-within:border-indigo-600 transition-all mb-6">
                    <CardElement
                      options={{
                        style: {
                          base: {
                            fontSize: "16px",
                            color: "#0f172a",
                            fontFamily: "Inter, sans-serif",
                            "::placeholder": { color: "#94a3b8" },
                          },
                          invalid: { color: "#ef4444" },
                        },
                      }}
                    />
                  </div>

                  {cardError && (
                    <div className="p-3 bg-red-50 rounded-xl text-red-600 text-xs font-bold mb-4">
                      {cardError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!stripe || loading}
                    className="w-full h-14 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      `Securely Pay ₹${course.price}`
                    )}
                  </button>
                </form>

                <p className="text-center text-[10px] text-slate-400 mt-6 font-medium leading-relaxed">
                  By completing this purchase, you agree to our <span className="underline">Terms of Intelligence</span>.
                </p>
              </div>

              <button className="w-full mt-4 h-14 bg-slate-900 border border-white/5 rounded-2xl text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-800 transition-all">
                <span>🅿️</span> Alternative Methods
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buy;