"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "../utils/AuthGuard";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guests: 1,
    datetime: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "guests" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to save booking");
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);

      setFormData({ name: "", email: "", guests: 1, datetime: "" });
      closeModal();

    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      setTimeout(() => setError(null), 4000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    
    router.push("/");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen relative text-white bg-[#050505] font-sans selection:bg-red-500/30 overflow-x-hidden">
      <div
          className={`
            fixed left-1/2 transform -translate-x-1/2
            bg-red-500 text-white
            px-6 py-3 sm:px-10 sm:py-4 md:px-14 md:py-6
            text-sm sm:text-lg md:text-xl
            shadow-lg z-50
            rounded-md text-center
            max-w-[90%] sm:max-w-md md:max-w-lg
            transition-all duration-500 ease-in-out
            ${showSuccess ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"}
            top-20 sm:top-10 md:top-28 lg:top-10
          `}
        >
          Booking confirmed!
        </div>

        {error && (
          <div className="fixed top-5 left-1/2 transform -translate-x-1/2
                          bg-red-500 text-white px-12 py-4 text-center
                          rounded-md shadow-lg z-50
                          transition-all duration-500 ease-in-out">
            {error}
          </div>
        )}

        <nav
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
            scrolled || isMenuOpen
              ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4"
              : "bg-transparent py-6"
          }`}
        >
          <div className=" mx-auto flex justify-between items-center px-6 md:px-16 xl:px-28">

            <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-widest hover:text-red-500 transition-colors cursor-default">
              Opalite<span className="text-red-500">.</span>
            </h1>

            <ul className="hidden md:flex gap-10 text-lg uppercase tracking-[0.25em] text-white/80 font-medium">
              <li>
                <Link href="/home" className="hover:text-white transition relative group">
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-white transition relative group">
                  Menu
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/order" className="hover:text-white transition relative group">
                  Order
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link href="/" 
                  onClick={handleLogout}
                  className="hover:text-white transition relative group">
                    Log out
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            </ul>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 flex flex-col gap-1"
              >
                <span className="block w-8 h-1 bg-white"></span>
                <span className="block w-8 h-1 bg-white"></span>
                <span className="block w-8 h-1 bg-white"></span>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <ul className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center gap-6 py-6 md:hidden">
              <li><Link href="/home" className="hover:text-red-500">Home</Link></li>
              <li><Link href="/menu" className="hover:text-red-500">Menu</Link></li>
              <li><Link href="/order" className="hover:text-red-500">Order</Link></li>
              <li><Link href="/" className="hover:text-red-500">Log Out</Link></li>
            </ul>
          )}
        </nav>

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/background.jpg')" }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/50 to-[#050505]" />

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-24 text-center">
          <span className="uppercase tracking-[0.3em] text-red-500 text-sm font-semibold mb-4 block">
            Welcome to Excellence
          </span>

          <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">
            Taste The <span className="italic font-light text-white/90">Luxury</span>
          </h2>

          <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-light leading-relaxed">
            Experience unforgettable flavors, premium ingredients,
            and an elegant atmosphere — all in one place.
          </p>

          <button
            onClick={openModal}
            className="cursor-pointer px-12 py-5 bg-red-500 hover:bg-red-600 text-white uppercase tracking-widest text-lg transition-all duration-300"
          >
            Book a Table
          </button>
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
            
            <div
              onClick={closeModal}
              className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            />

            <div
              className={`relative bg-[#111] border border-white/10 p-8 w-full max-w-md text-white shadow-2xl transition-all duration-300 ${
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-6"
              }`}
            >
              <h3 className="text-2xl font-serif mb-4 text-center">
                Reserve Your Table
              </h3>

              <p className="text-white/50 text-center text-sm mb-6 font-light">
                An unforgettable dining experience awaits.
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-red-500"
                  value={formData.name}
                  onChange={handleChange}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-red-500"
                  value={formData.email}
                  onChange={handleChange}
                />

                <input
                  type="number"
                  name="guests"
                  min="1"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-red-500"
                  value={formData.guests}
                  onChange={handleChange}
                />

                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  className="w-full bg-transparent border-b border-white/20 py-2 focus:outline-none focus:border-red-500"
                  value={formData.datetime}
                  onChange={handleChange}
                />

                <button
                  type="submit"
                  className="cursor-pointer mt-4 bg-red-500 hover:bg-red-600 text-white py-3 rounded-none transition"
                >
                  Confirm Reservation
                </button>
              </form>

              <button
                onClick={closeModal}
                className="cursor-pointer absolute top-1 right-4 text-white/40 hover:text-white text-4xl"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <footer className="relative z-10 bg-[#050505] pt-22 pb-10">

          <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center text-gray-300 gap-12">

            <h4 className="text-white text-4xl font-serif italic">
              Contact Us
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">

              {[
                { icon: "📍", title: "Location", text: "123 Luxury Street, City" },
                { icon: "📞", title: "Reservations", text: "+1 234 567 890" },
                { icon: "✉", title: "Inquiries", text: "info@opaliterestaurant.com" }
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-9 bg-white/6 border border-white/10 backdrop-blur-xl text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-600/20"
                >
                  <div className="text-4xl mb-6">{item.icon}</div>
                  <p className="text-sm uppercase tracking-[0.3em] text-red-500 mb-3">
                    {item.title}
                  </p>
                  <p className="text-white/90 font-light text-lg break-words">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-full mt-12">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
            </div>

            <div className="text-center text-gray-500 text-sm pt-6">
              © {new Date().getFullYear()} Opalite Restaurant. All rights reserved.
            </div>

          </div>
        </footer>
      </div>
    </AuthGuard>
  );
}