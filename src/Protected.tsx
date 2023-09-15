import { Navigate } from "react-router-dom";
import { useAppSelector } from "./store/store";

type ProtectedProps = {
    children: React.ReactNode;
}
const Protected = ({children}:ProtectedProps) => {
    const isAuth = useAppSelector(state => state.isAuth)
    console.log(isAuth)
    if(isAuth) 
    return children
    else return <Navigate to={"/login"} replace= {true}></Navigate>
        
}

export default Protected
