import type {SubmitHandler} from 'react-hook-form';
import {useForm} from 'react-hook-form';
import { Axios } from '../../config/axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { IUser } from '../../types/utility';

export const SignUp = () => {
    const {register, handleSubmit} = useForm<IUser>();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignUp: SubmitHandler<IUser> = (form) => {
        Axios.post<{message: string}>("/auth/signup", form)
             .then(() => {
                navigate("/login")
             })
             .catch(err => {
                setError(err.response?.data?.message)
             })
    }

    return ( 
        <div>
           <h1>Signup Page</h1> 
           {error && <p style={{ color: "red" }}>{error}</p>}

           <form onSubmit={handleSubmit(handleSignUp)}>
                <div>
                    <label>First Name: </label>
                    <input type="text" {...register("firstName", {required: true})} />
                </div>

                <div>
                    <label>Last Name: </label>
                    <input type="text" {...register("lastName", {required: true})} />
                </div>

                <div>
                    <label>Username: </label>
                    <input type="text" {...register("username", {required: true})} />
                </div>

                <div>
                    <label>Password: </label>
                    <input type="text" {...register("password", {required: true})} />
                </div>

                <button type="submit">Sign Up</button>
           </form>

           <p>
                Already have an account? <Link to="/login">Log in</Link>
           </p>
        </div> 
    )
}