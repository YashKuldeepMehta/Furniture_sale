import { useContext,createContext, useState, useEffect } from "react";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AuthContext = createContext();

export const AuthProvider  = ({children}) =>{
    const[isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('admin-token')); 

    useEffect(() =>{
        const token = localStorage.getItem('admin-token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    })

    const login = (token) =>{
        localStorage.setItem('admin-token', token);
        setIsLoggedIn(true);
        toast.success("Login successful", { position: "top-center", autoClose: 1500 });

    }

    const logout = ()=>{
        localStorage.removeItem('admin-token');
        setIsLoggedIn(false);
        toast.success("You are logged out!!", { position: "top-center", autoClose: 1500 });
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
        
    );
}

export const useAuth = () => useContext(AuthContext);