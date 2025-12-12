import { TableProducts } from "../TableProducts";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext"; 
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useEffect } from "react";

export function Admin(){
const {getUserName, userName} = useContext(AuthContext);
useEffect(() => {
    async function checkLogin(){
        onAuthStateChanged(auth, (user) => {
            if(user?.displayName){
                getUserName(user?.displayName)
            }
        })
    }
    checkLogin()
},[])
    return(
        <div>
            <div className="pl-10 pr-10">
                <h1 className="text-lg font-bold text-end">Olá <span className="text-[#0344f8] font-bold">{userName}</span> seja bem-vindo!</h1>
            </div>
            <TableProducts/>
        </div>
    )
}