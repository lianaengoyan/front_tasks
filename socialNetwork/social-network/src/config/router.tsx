import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "../pages/available/signup";
import { LogIn } from "../pages/available/login";
import { Profile } from "../pages/protected/profile";
import { Protected } from "../pages/protected/layout";
import { NotFound } from "../pages/available/notFound";
import { Settings } from "../pages/protected/settings";

export const routes = createBrowserRouter ([
    // {
    //     path: "/",
    //     element: <SignUp/>
    // },
    
    {
        path: "/login",
        element: <LogIn/>
    },
    {
        path: "/signup",
        element: <SignUp/>
    },
    {
        path: "/profile",
        element: <Protected/>,
        children: [
            {path: "", element: <Profile/>},
            {path: "settings", element: <Settings/>}
        ]
    },
    {
        path: "*",
        element: <NotFound/>
    }
])
