import { createContext, useState } from "react";

const UserContext = createContext()

function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(false)


    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </UserContext.Provider>
    )
}



export {UserContext, UserProvider}


