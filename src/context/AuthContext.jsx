import {createContext, useContext, useState, useEffect} from "react"
import axios from "axios"

const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)

    useEffect(() => {
        const fetchUser = async()=>{
            try {
                const res =await axios.get("http://localhost:3000/api/auth/me",{
                    withCredentials: true
                })
                setuser(res.data.user)
                localStorage.setItem("user", JSON.stringify(res.data.user))
            } catch (error) {
                setuser(null)
            }finally{
                setloading(false)
            }
        }
        fetchUser();
    }, [])

    return (
        <AuthContext.Provider value={{user,setuser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)