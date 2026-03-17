import Link from "next/link";

interface CartTabProps {
    groupedOrders: any[];
    updateQuantity: (id: string, action: 'plus' | 'minus') => void;
    address: string;
    setAddress: (val: string) => void;
    searchAddress: (query: string) => void;
    showSuggestions: boolean;
    setShowSuggestions: (val: boolean) => void;
    suggestions: any[];
    totalPrice: number;
    handlePlaceOrder: () => void;
}

export const CartTab = ({ 
    groupedOrders, updateQuantity, address, setAddress, searchAddress, 
    showSuggestions, setShowSuggestions, suggestions, totalPrice, handlePlaceOrder 
}: CartTabProps) => (
    <div className="space-y-6">
        {groupedOrders.length === 0 ? (
            <div className="text-center p-16 bg-white/5 border border-white/10 backdrop-blur-xl">
                <p className="text-white/30 text-[14px] mb-8 font-light italic">No items in your cart</p>
                <Link href="/menu" className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-black transition text-[12px] font-bold uppercase tracking-widest">Back to menu</Link>
            </div>
        ) : (
            <>
                {groupedOrders.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-8 p-6 bg-white/6 border border-white/10 backdrop-blur-xl hover:bg-white/10 transition-all">
                        <div className="w-20 h-20 bg-cover bg-center border border-white/10" style={{ backgroundImage: `url(${item.image})` }} />
                        <div className="flex-1">
                            <h3 className="text-xl font-medium tracking-tight">{item.name}</h3>
                            <div className="flex items-center gap-4 mt-3">
                                <button onClick={() => updateQuantity(item.id, 'minus')} className="w-8 h-8 border border-white/20 hover:bg-red-500 transition">-</button>
                                <span className="font-bold">{item.count}</span>
                                <button onClick={() => updateQuantity(item.id, 'plus')} className="w-8 h-8 border border-white/20 hover:bg-red-500 transition">+</button>
                            </div>
                        </div>
                        <div className="text-2xl font-light">${item.price * item.count}</div>
                    </div>
                ))}
                <div className="mt-12 pt-10 border-t border-white/10 flex flex-col items-end gap-6">
                    <div className="w-full relative">
                        <p className="text-white/30 text-[11px] mb-4 uppercase tracking-[0.2em]">Delivery Address</p>
                        <input 
                            type="text" 
                            placeholder="Start typing address..." 
                            className="w-full bg-white/5 border border-white/10 p-5 backdrop-blur-xl focus:border-red-500 outline-none transition-all text-white" 
                            value={address} 
                            onChange={(e) => searchAddress(e.target.value)} 
                            onFocus={() => setShowSuggestions(true)}
                        />
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-[110] w-full bg-[#121212] border border-white/10 shadow-2xl">
                                {suggestions.map((s, i) => (
                                    <div key={i} className="p-4 hover:bg-red-600 cursor-pointer text-[13px] border-b border-white/5" onClick={() => { setAddress(s.display_name); setShowSuggestions(false); }}>{s.display_name}</div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <span className="text-white/30 text-[12px]">Total Amount</span>
                        <div className="text-5xl text-red-500 font-light tracking-tighter">${totalPrice}</div>
                    </div>
                    <button onClick={handlePlaceOrder} className="bg-red-600 text-white px-16 py-5 hover:bg-white hover:text-black transition text-[13px] font-bold uppercase tracking-widest">Place order now</button>
                </div>
            </>
        )}
    </div>
);