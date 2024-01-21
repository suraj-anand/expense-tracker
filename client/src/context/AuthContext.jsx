import { createContext, useState } from 'react'

export const AuthContext = createContext();

export function AuthContextProvider({ children }){
    
    const [authenticated, setAuthenticated] = useState(() => {
        if(localStorage.getItem("isAuthenticated") === "true"){
            return true;
        } else {
            return false;
        }
    })
    
    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}