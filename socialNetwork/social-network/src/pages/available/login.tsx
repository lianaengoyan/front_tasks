import type { SubmitHandler } from 'react-hook-form';
import {useForm} from 'react-hook-form';
import type { IUser } from '../../types/utility';
import { Axios } from '../../config/axios';
import {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const LogIn = () => {
    const {register, handleSubmit} = useForm<IUser>();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    
    const handleLogin: SubmitHandler<IUser> = (form) => {
        Axios.post<{token: string}>("/auth/signin", form)
             .then(response => {
                // console.log(response.data);//1
                localStorage.setItem("token", response.data.token)
                // console.log("TOKEN SAVED: ", localStorage.getItem("token"))//
                navigate("/profile")
             })
             .catch(err => {
                setError(err.response.data?.message)
             })
    }

    return (
        <div>
            <h1>Login Page</h1>

            {error && <p style={{color: "red"}}>{error}</p>}

            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <label>Username: </label>
                    <input type="text" {...register("username", {required: true})} />
                </div>

                <div>
                    <label>Password:</label>
                    <input type="password" {...register("password", {required: true})} />
                </div>

                <button type='submit'>Log In</button>
            </form>

            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </div>
    )
}