"use client";
import { createContext, useContext, useState, useEffect } from 'react';

type OrderItem = {
    id: string;
    name: string;
    price: number;
    image: string;
};

type OrderContextType = {
    orders: OrderItem[];
    addToOrders: (item: OrderItem) => void;
    clearOrders: () => void;
    setOrders: React.Dispatch<React.SetStateAction<OrderItem[]>>;
    favorites: any[];
    toggleFavorite: (item: any) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<OrderItem[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const syncUser = () => {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const { email } = JSON.parse(savedUser);
                if (email !== currentUserEmail) {
                    setCurrentUserEmail(email);
                }
            } else {
                if (currentUserEmail !== null) {
                    setCurrentUserEmail(null);
                    setFavorites([]);
                    setOrders([]);
                    setIsLoaded(false);
                }
            }
        };

        syncUser();
        const interval = setInterval(syncUser, 1000); 
        return () => clearInterval(interval);
    }, [currentUserEmail]);

    useEffect(() => {
        if (!currentUserEmail) return;

        const loadUserData = async () => {
            const savedOrders = localStorage.getItem(`cart_${currentUserEmail}`);
            if (savedOrders) setOrders(JSON.parse(savedOrders));
            else setOrders([]);

            try {
                const res = await fetch(`http://localhost:5000/users?email=${currentUserEmail}`);
                const data = await res.json();
                if (data.length > 0) {
                    setFavorites(data[0].favorites || []);
                } else {
                    setFavorites([]);
                }
            } catch (err) {
                console.error("Fetch favorites error:", err);
            }
            setIsLoaded(true);
        };

        loadUserData();
    }, [currentUserEmail]);

    useEffect(() => {
        if (isLoaded && currentUserEmail) {
            localStorage.setItem(`cart_${currentUserEmail}`, JSON.stringify(orders));
        }
    }, [orders, isLoaded, currentUserEmail]);

    const toggleFavorite = async (item: any) => {
        if (!currentUserEmail) {
            alert("Please log in to manage favorites");
            return;
        }

        try {
            const userRes = await fetch(`http://localhost:5000/users?email=${currentUserEmail}`);
            const userData = await userRes.json();
            if (userData.length === 0) return;

            const dbUser = userData[0];
            const isExist = dbUser.favorites?.find((f: any) => f.id === item.id);
            
            const updatedFavorites = isExist 
                ? dbUser.favorites.filter((f: any) => f.id !== item.id) 
                : [...(dbUser.favorites || []), item];

            await fetch(`http://localhost:5000/users/${dbUser.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorites: updatedFavorites }),
            });

            setFavorites(updatedFavorites);
        } catch (err) {
            console.error("Toggle favorite error:", err);
        }
    };

    const addToOrders = (item: OrderItem) => {
        setOrders(prev => [...prev, item]);
    };

    const clearOrders = () => {
        setOrders([]);
        if (currentUserEmail) {
            localStorage.removeItem(`cart_${currentUserEmail}`);
        }
    };

    return (
        <OrderContext.Provider value={{ orders, addToOrders, clearOrders, setOrders, favorites, toggleFavorite }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used inside OrderProvider");
    return context;
}