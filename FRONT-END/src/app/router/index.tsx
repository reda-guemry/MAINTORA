import { LoginPage } from "@/features/auth/pages/LoginPage";
import { createBrowserRouter } from "react-router-dom";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <h1>Home</h1>  
    }, 
    {
        path : "/login",
        element : <LoginPage />
    }
])