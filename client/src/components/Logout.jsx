import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const navigate = useNavigate()


    function handleLogout(){
        window.localStorage.clear()
        
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}