"use client";
import { useState, useEffect } from "react";
import { useOrders } from "../context/OrdersContext";
import Link from "next/link";

// Импортируем компоненты
import { StatusNotification } from "../components/StatusNotification";
import { ConfirmModal } from "../components/ConfirmModal";
import { CartTab } from "../components/CartTab";

export default function OrderPage() {
    const { orders, setOrders, clearOrders } = useOrders(); 
    const [status, setStatus] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"cart" | "bookings" | "history">("cart");
    const [myBookings, setMyBookings] = useState<any[]>([]);
    const [orderHistory, setOrderHistory] = useState<any[]>([]);
    const [confirmAction, setConfirmAction] = useState<{ id: string | number, type: 'booking' | 'order' } | null>(null);
    const [showModalAnim, setShowModalAnim] = useState(false);
    const [address, setAddress] = useState<string>("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const totalPrice = orders.reduce((sum, item) => sum + item.price, 0);

    // Модальное окно анимация
    useEffect(() => {
        if (confirmAction) {
            const timeout = setTimeout(() => setShowModalAnim(true), 10);
            return () => clearTimeout(timeout);
        } else {
            setShowModalAnim(false);
        }
    }, [confirmAction]);

    const fetchData = async () => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return;
        const user = JSON.parse(savedUser);
        try {
            if (activeTab === "bookings") {
                const res = await fetch(`http://localhost:5000/bookings?email=${user.email}`);
                const data = await res.json();
                setMyBookings(data.reverse());
            } else if (activeTab === "history") {
                const res = await fetch(`http://localhost:5000/orders?userEmail=${user.email}`);
                const data = await res.json();
                setOrderHistory(data.reverse());
            }
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchData(); }, [activeTab]);

    const searchAddress = async (query: string) => {
        setAddress(query);
        const API_KEY = "931f2496772f4329bbf9eb3ff7c5c0cf";
        if (query.length > 3) {
            try {
                const res = await fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&format=json&limit=5&lang=en&apiKey=${API_KEY}`);
                if (res.ok) {
                    const data = await res.json();
                    setSuggestions(data.results.map((item: any) => ({ display_name: item.formatted })));
                    setShowSuggestions(true);
                }
            } catch (err) { setShowSuggestions(false); }
        } else { setShowSuggestions(false); }
    };

    const updateQuantity = (id: string, action: 'plus' | 'minus') => {
        if (action === 'plus') {
            const item = orders.find(o => o.id === id);
            if (item) setOrders([...orders, item]);
        } else {
            const index = orders.findLastIndex(o => o.id === id);
            if (index !== -1) {
                const newOrders = [...orders];
                newOrders.splice(index, 1);
                setOrders(newOrders);
            }
        }
    };

    const handleConfirmDelete = async () => {
        if (!confirmAction) return;
        const { id, type } = confirmAction;
        await fetch(`http://localhost:5000/${type === 'booking' ? 'bookings' : 'orders'}/${id}`, { method: "DELETE" });
        showNotification(type === 'booking' ? "Booking cancelled" : "Order received");
        setShowModalAnim(false);
        setTimeout(() => { setConfirmAction(null); fetchData(); }, 300);
    };

    const showNotification = (msg: string) => {
        setStatus(msg);
        setTimeout(() => setStatus(null), 3000);
    };

    const handlePlaceOrder = async () => {
        const savedUser = localStorage.getItem("user");
        if (!savedUser) return;
        const user = JSON.parse(savedUser);
        if (orders.length === 0 || !address) {
            showNotification(!address ? "Please select delivery address" : "Cart is empty");
            return;
        }
        const orderData = { userEmail: user.email, items: orders, total: totalPrice, address: address, date: new Date().toLocaleString() };
        const res = await fetch("http://localhost:5000/orders", {
            method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(orderData),
        });
        if (res.ok) {
            showNotification("Order placed successfully!");
            clearOrders();
            setAddress("");
        }
    };

    const groupedOrders = orders.reduce((acc: any[], item) => {
        const existing = acc.find(i => i.id === item.id);
        if (existing) existing.count += 1;
        else acc.push({ ...item, count: 1 });
        return acc;
    }, []);

    return (
        <div className="min-h-screen relative text-white overflow-x-hidden font-sans">
            <StatusNotification status={status} />
            
            <ConfirmModal 
                confirmAction={confirmAction} 
                showModalAnim={showModalAnim} 
                onClose={() => setConfirmAction(null)} 
                onConfirm={handleConfirmDelete} 
            />

            <div className="fixed inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/background.jpg')" }} />
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-[#050505]/80 via-[#050505]/60 to-[#050505]" />

            <div className="relative z-10 pt-24 pb-20 px-6">
                <h1 className="text-5xl text-center mb-16 tracking-tight font-normal">
                    Manage your <span className="text-red-500 italic">activity</span>
                </h1>

                {/* Tabs */}
                <div className="relative w-full max-w-xl mx-auto h-14 bg-white/5 border border-white/10 backdrop-blur-xl mb-16 p-1 flex">
                    <div className={`absolute top-1 bottom-1 w-[calc(33.33%-4px)] bg-red-600 transition-transform duration-500 ease-in-out 
                        ${activeTab === "cart" ? "translate-x-0" : activeTab === "bookings" ? "translate-x-full" : "translate-x-[200%]"}`} />
                    <button onClick={() => setActiveTab("cart")} className={`relative z-10 flex-1 text-[11px] font-bold transition-colors ${activeTab === "cart" ? "text-white" : "text-white/40"}`}>Cart ({orders.length})</button>
                    <button onClick={() => setActiveTab("bookings")} className={`relative z-10 flex-1 text-[11px] font-bold transition-colors ${activeTab === "bookings" ? "text-white" : "text-white/40"}`}>Bookings</button>
                    <button onClick={() => setActiveTab("history")} className={`relative z-10 flex-1 text-[11px] font-bold transition-colors ${activeTab === "history" ? "text-white" : "text-white/40"}`}>My Orders</button>
                </div>

                <div className="max-w-4xl mx-auto">
                    {activeTab === "cart" && (
                        <CartTab 
                            groupedOrders={groupedOrders}
                            updateQuantity={updateQuantity}
                            address={address}
                            setAddress={setAddress}
                            searchAddress={searchAddress}
                            showSuggestions={showSuggestions}
                            setShowSuggestions={setShowSuggestions}
                            suggestions={suggestions}
                            totalPrice={totalPrice}
                            handlePlaceOrder={handlePlaceOrder}
                        />
                    )}

                    {activeTab === "bookings" && (
                        <div className="space-y-6">
                            {myBookings.length === 0 ? 
                                <div className="text-center p-16 bg-white/5 border border-white/10 backdrop-blur-xl">
                                    <p className="text-white/30 text-[14px] mb-8 font-light italic">No active reservations</p>
                                    <Link href="/home" className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-black transition text-[12px] font-bold uppercase tracking-widest">Back to home</Link>
                                </div> :
                                myBookings.map((b) => (
                                    <div key={b.id} className="p-8 bg-white/6 border border-white/10 backdrop-blur-xl flex justify-between items-center transition-all hover:border-red-500/50">
                                        <div>
                                            <p className="text-red-500 text-[11px] font-bold mb-3 uppercase tracking-widest">Confirmed</p>
                                            <h3 className="text-3xl tracking-tight mb-2 italic text-white font-serif">
                                                Table for {b.guests} <span className="text-white/20 text-xl font-light not-italic ml-2">— {b.name}</span>
                                            </h3>
                                            <div className="flex gap-6 text-white/50 text-[14px] font-light mt-4">
                                                <span>Date: {new Date(b.datetime).toLocaleDateString()}</span>
                                                <span className="text-white/10">|</span>
                                                <span>Time: <span className="text-white font-medium">{new Date(b.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></span>
                                            </div>
                                        </div>
                                        <button onClick={() => setConfirmAction({ id: b.id, type: 'booking' })} className="px-8 py-3 border border-red-500/30 text-red-500 text-[11px] font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest cursor-pointer">Cancel</button>
                                    </div>
                                ))}
                        </div>
                    )}

                    {activeTab === "history" && (
                        <div className="space-y-6">
                            {orderHistory.length === 0 ? <div className="text-center p-16 bg-white/5 border border-white/10 backdrop-blur-xl text-white/30 italic font-light">Order history is empty</div> :
                                orderHistory.map((order) => (
                                    <div key={order.id} className="p-8 bg-white/6 border border-white/10 backdrop-blur-xl flex justify-between items-center transition-all">
                                        <div className="flex-1 pr-10">
                                            <p className="text-red-500 text-[11px] font-bold mb-2 uppercase">Order ID: #{order.id}</p>
                                            <h3 className="text-2xl font-medium mb-1 tracking-tight text-white">Total: ${order.total}</h3>
                                            <p className="text-white/40 text-[12px] mb-3">{order.date}</p>
                                            {order.address && <div className="text-[10px] text-white/30 border-t border-white/5 pt-3 italic uppercase tracking-wider">To: {order.address}</div>}
                                        </div>
                                        <button onClick={() => setConfirmAction({ id: order.id, type: 'order' })} className="px-10 py-4 bg-white text-black text-[11px] font-bold hover:bg-red-500 hover:text-white transition-all uppercase tracking-widest cursor-pointer">Received</button>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}