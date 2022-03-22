import React from "react";

export default function Logout(){

    return (
        <div>
            <button onClick={e => window.localStorage.clear() }>Logout</button>
        </div>
    )
}