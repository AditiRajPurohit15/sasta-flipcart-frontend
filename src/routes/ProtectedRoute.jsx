import {Navigate} from "react-router-dom"

const ProctedRutes = ({children, user, allowedRoles})=>{
    console.log(user)
if(!user){
    return <Navigate to="/register" replace/>
}
if(allowedRoles && !allowedRoles.includes(user.role)){
    return <Navigate to="/" replace/>
}
return children
}

export default ProctedRutes
