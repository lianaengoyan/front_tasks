import {Outlet, Link, useNavigate} from "react-router-dom"
import { Axios } from "../../config/axios";
import { useEffect, useState } from "react";
import type { IAccount } from "../../types/utility";

export const Protected = () => {
    const [account, setAccount] = useState<IAccount | null> (null);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get<{user: IAccount}>("/auth/user")
             .then(res => { setAccount(res.data.user) })
             .catch(() => { navigate("/login")})
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    if (!account) return <p>Loading user...</p>;

    return (
        <div>
            <nav>
                <Link to="/profile"> Profile </Link>
                <Link to="/profile/settings"> Settings </Link>
                <button onClick={handleLogout}> Layout </button>
            </nav>

            <main>
                <Outlet context={{user: account}} />
            </main>
        </div>
    )
} 