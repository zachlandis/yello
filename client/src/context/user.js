import { createContext, useState } from "react";
import Login from "../components/Login";

const UserContext = createContext()

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState({})


    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}



export {UserContext, UserProvider}


