import { Navigate } from "react-router-dom";

type ProtectedProps = {
    children: React.ReactNode;
}
const Protected = ({children}:ProtectedProps) => {
    const isAuth = false;
    if(isAuth) 
    return children
    else return <Navigate to={"/login"}></Navigate>
        
}

export default Protected
