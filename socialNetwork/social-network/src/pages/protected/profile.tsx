import { useOutletContext } from "react-router-dom";
import type { IAccount } from "../../types/utility";

export const Profile = () => {
    const {user} = useOutletContext<{user: IAccount}>();

    if (!user) return <p>No user data available</p>;

    return ( 
        <div>
            <h1>Profile Page</h1>

            <p><b>Username: </b>{user.username}</p>
            <p><b>Name: </b>{user.firstName} {user.lastName}</p>

        </div>
    )
}