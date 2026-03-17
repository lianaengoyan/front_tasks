"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useOrders } from "../context/OrdersContext";

interface Item {
    id: string;
    name: string;
    price: number;
    cuisine: string;
    category: string;
    vegetarian: boolean;
    spicy: boolean;
    rating: number;
    image: string;
}

export default function MenuPage() {
    const [dishes, setDishes] = useState<Item[]>([]);
    const [desserts, setDesserts] = useState<Item[]>([]);
    const [drinks, setDrinks] = useState<Item[]>([]);

    const [mainFilter, setMainFilter] = useState("All");
    const [cuisineFilter, setCuisineFilter] = useState("All");

    const [isLoading, setIsLoading] = useState(true); 

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const { addToOrders, favorites, toggleFavorite } = useOrders();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [d, ds, dr] = await Promise.all([
                    fetch("http://localhost:5000/dishes").then(res => res.json()),
                    fetch("http://localhost:5000/desserts").then(res => res.json()),
                    fetch("http://localhost:5000/drinks").then(res => res.json())
                ]);
                setDishes(d);
                setDesserts(ds);
                setDrinks(dr);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getActiveItems = () => {
        if (mainFilter === "Favorites") return favorites;
        if (mainFilter === "Dishes") return dishes;
        if (mainFilter === "Desserts") return desserts;
        if (mainFilter === "Drinks") return drinks;
        return [...dishes, ...desserts, ...drinks];
    };

    const cuisines = ["All", "Italian", "Chinese", "Japanese", "Grill", "Healthy", "French", "American"];

    const filteredItems = getActiveItems().filter(item => {
        if (cuisineFilter === "All") return true;
        return item.cuisine === cuisineFilter;
    });

    return (
        <div className="min-h-screen relative text-white overflow-x-hidden">
            <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }} />
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]" />

            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled || isMenuOpen ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}>
                <div className="mx-auto flex justify-between items-center px-6 md:px-16 xl:px-28">
                    <h1 className="text-3xl md:text-4xl font-serif font-medium tracking-widest hover:text-red-500 transition-colors cursor-default">
                        Opalite<span className="text-red-500">.</span>
                    </h1>
                    <ul className="hidden md:flex gap-10 text-lg uppercase tracking-[0.25em] text-white/80 font-medium">
                        {["Home", "Menu", "Order", "Log Out"].map((item, i) => (
                            <li key={i}><Link href={item === "Home" ? "/home" : item === "Menu" ? "/menu" : item === "Order" ? "/order" : "/"} className="hover:text-white transition relative group">{item}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-red-500 transition-all duration-300 group-hover:w-full"></span></Link></li>
                        ))}
                    </ul>
                    <div className="md:hidden"><button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 flex flex-col gap-1"><span className="block w-8 h-1 bg-white"></span><span className="block w-8 h-1 bg-white"></span><span className="block w-8 h-1 bg-white"></span></button></div>
                </div>
                {isMenuOpen && (
                    <ul className="absolute top-full left-0 w-full bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center gap-6 py-6 md:hidden">
                        <li><Link href="/home" className="hover:text-red-500"> Home </Link></li>
                        <li><Link href="/menu" className="hover:text-red-500"> Menu </Link></li>
                        <li><Link href="/order" className="hover:text-red-500"> Order </Link></li>
                        <li><Link href="/" className="hover:text-red-500"> Log Out </Link></li>
                    </ul>
                )}
            </nav>

            <div className="relative z-10 pt-40 pb-20 px-6">
                <h1 className="text-5xl font-serif text-center mb-12">Our <span className="text-red-500"> Menu </span></h1>

                <div className="flex flex-wrap justify-center gap-6 mb-10">
                    {["All", "Favorites", "Dishes", "Desserts", "Drinks"].map(filter => (
                        <button key={filter} onClick={() => { setMainFilter(filter); setCuisineFilter("All"); }}
                            className={`px-8 py-2 border transition-all duration-300 flex items-center gap-2 ${mainFilter === filter ? "bg-red-500 border-red-500" : "border-white/20 hover:border-red-500"}`}>
                            {filter}
                            {filter === "Favorites" && <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded">{favorites.length}</span>}
                        </button>
                    ))}
                </div>

                {mainFilter !== "All" && mainFilter !== "Favorites" && (
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {cuisines.map(c => (
                            <button key={c} onClick={() => setCuisineFilter(c)}
                                className={`px-6 py-1 border text-sm transition-all duration-300 ${cuisineFilter === c ? "bg-red-500 border-red-500" : "border-white/20 hover:border-red-500"}`}>{c}</button>
                        ))}
                    </div>
                )}

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {isLoading ? (
                        [1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="p-6 bg-white/5 border border-white/10 animate-pulse">
                                <div className="h-64 bg-white/10 mb-6" />
                                <div className="h-8 bg-white/10 w-3/4 mb-4" />
                                <div className="h-4 bg-white/10 w-1/4 mb-8" />
                                <div className="flex justify-between border-t border-white/10 pt-5 mt-auto">
                                    <div className="w-16 h-8 bg-white/10" />
                                    <div className="w-24 h-10 bg-white/10" />
                                </div>
                            </div>
                        ))
                    ) : filteredItems.length > 0 ? (
                        filteredItems.map((item) => {
                            const isLiked = favorites.some((f) => f.id === item.id);
                            return (
                                <div key={item.id} className="p-6 bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-600/10">
                                    <div className="relative overflow-hidden mb-6">
                                        <div className="h-64 md:h-72 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                                        <button onClick={() => toggleFavorite(item)} className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-red-600 transition-all duration-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" 
                                                fill={isLiked ? "red" : "none"} 
                                                viewBox="0 0 24 24" 
                                                stroke={isLiked ? "red" : "white"} 
                                                className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="mb-4">
                                        <div className="flex justify-between items-baseline">
                                            <h3 className="text-2xl font-serif tracking-tight">{item.name}</h3>
                                            <span className="text-white/40 text-xs tracking-tighter">★ {item.rating}</span>
                                        </div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold mt-1">{item.cuisine}</p>
                                    </div>
                                    <div className="flex items-center justify-between border-t border-white/10 pt-5 mt-auto">
                                        <div className="flex flex-col gap-2">
                                            <span className="text-xl font-light tracking-tight">${item.price}</span>
                                            <div className="flex gap-2">
                                                {item.vegetarian && <span className="text-[9px] px-2 py-0.5 border border-green-500/50 text-green-400 uppercase tracking-widest">Veg</span>}
                                                {item.spicy && <span className="text-[9px] px-2 py-0.5 border border-red-500/50 text-red-400 uppercase tracking-widest">Spicy</span>}
                                            </div>
                                        </div>
                                        <button onClick={() => addToOrders(item)} className="cursor-pointer bg-red-600 hover:bg-white hover:text-black text-white px-6 py-3 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 active:scale-95">Add to cart</button>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-20 flex flex-col items-center gap-4">
                            <p className="text-white/20 italic">No items found here...</p>
                            <button onClick={() => {setMainFilter("All"); setCuisineFilter("All");}} className="text-red-500 border border-red-500/30 px-6 py-2 hover:bg-red-500 hover:text-white transition">Reset Filters</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}