import { BsBoxSeam } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TbEyeExclamation } from "react-icons/tb";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { PiSignOutBold } from "react-icons/pi";
import { GiJigsawBox } from "react-icons/gi";
import { useNavigate } from "react-router";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { NavLink } from "react-router";

interface SidebarProps{
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

export function Sidebar({isCollapsed, setIsCollapsed}: SidebarProps){
const {logout} = useContext(AuthContext);
const navigate = useNavigate();
const [isHovered, setIsHovered] = useState(true);

async function logoutUser(){
    await signOut(auth);
    logout();
    navigate("/login")
}

function sidebarCollapsed(){
    setIsCollapsed(true)
}
    return(
        <div>
            <main
            className={`
                fixed top-0 left-0
                ${!isCollapsed ? "w-64" : "w-20"}
                h-screen bg-white flex flex-col
                transition-all ease-in-out duration-300
                z-50
            `}
            onMouseEnter={() => {
                if (isCollapsed) setIsHovered(true);
            }}
            onMouseLeave={() => {
                if (isCollapsed) setIsHovered(false);
            }}
            >
                <nav className="text-black pr-5 pl-5 flex flex-col h-screen justify-between">
                        <div className="flex items-center ml-2 mt-8 relative">
                            {isHovered ? <button  className="h-8" onClick={() => setIsCollapsed(false)}><div className="hover:text-[#0344f8] hover:bg-[#6f5af511] rounded-lg duration-500 ease-in-out cursor-pointer"><TbLayoutSidebarRightExpand className="absolute right-0.5 text-2xl top-1 text-gray-400"/></div></button> : <GiJigsawBox className="h-8 w-8 text-[#0344f8]"/>}

                            {!isCollapsed && <div className="flex items-center justify-center"><GiJigsawBox className="h-8 w-8 text-[#0344f8]"/><h1 className="text-2xl font-bold ml-2.5 text-[#0344f8]">DataCerta</h1></div>}
                            <button className="cursor-pointer" onClick={() => sidebarCollapsed()}>
                                <div className="hover:text-[#0344f8] hover:bg-[#6f5af511] rounded-lg duration-500 ease-in-out cursor-pointer">
                                    {!isCollapsed && <TbLayoutSidebarRightExpand className="absolute right-0.5 text-2xl top-1 text-gray-400"/>}
                                </div>
                            </button>
                        </div>
                    <div className="flex flex-col gap-5">
                            <NavLink 
                                to="admin/products"
                                className={({ isActive }) =>
                                    `relative  rounded-lg duration-500 ease-in-out 
                                    ${isActive ? "bg-[#0344f831] text-[#0344f8]" : "hover:text-[#0344f8] hover:bg-[#0344f831]"}`
                                }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <BsBoxSeam className="absolute top-2 left-3 text-lg"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out pt-2.5 pb-2.5 pl-3">
                                <BsBoxSeam className="absolute top-3.5 left-4 text-lg"/>
                                <p className={`font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Produtos</p>
                            </div>
                            }
                        </NavLink>
                        <NavLink 
                            to="admin/expiring"
                            className={({ isActive }) =>
                                `relative  rounded-lg duration-500 ease-in-out 
                                ${isActive ? "bg-[#0344f831] text-[#0344f8]" : "hover:text-[#0344f8] hover:bg-[#0344f831]"}`
                            }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <TbEyeExclamation className="absolute top-1 left-2 text-2xl"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out  pt-2.5 pb-2.5 pl-3">
                                <TbEyeExclamation className="absolute top-2.5 left-3 text-2xl"/>
                                <p className={`font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Vencendo!</p>
                            </div>
                            }
                        </NavLink>
                        <NavLink 
                            to="admin/expired"
                            className={({ isActive }) =>
                                `relative  rounded-lg duration-500 ease-in-out 
                                ${isActive ? "bg-[#0344f831] text-[#0344f8]" : "hover:text-[#0344f8] hover:bg-[#0344f831]"}`
                            }
                            >
                            {isCollapsed ? 
                                <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out mt-2 pt-3 pb-3 pl-3">
                                    <IoIosCloseCircleOutline className="absolute top-1 left-2 text-2xl"/>
                                    <p className={`font-medium pl-12 ${isCollapsed ? "hidden" : "block"}`}>{`Todos os Produtos`}</p>
                                </div>
                                :
                            <div className="hover:text-[#0344f8] rounded-lg duration-500 ease-in-out  pt-2.5 pb-2.5 pl-3">
                                <IoIosCloseCircleOutline className="absolute top-2.5 left-3 text-2xl"/>
                                <p className={`font-medium pl-10 pr-3 ${isCollapsed ? "hidden" : "block"}`}>Vencidos</p>
                            </div>
                            }
                        </NavLink>
                    </div>
                    <button onClick={() => logoutUser()}>
                        {
                        isCollapsed ? 
                        <div className="flex gap-5 mb-8 hover:text-[#0344f8] rounded-lg duration-500 ease-in-out cursor-pointer pt-2.5 pb-2.5 pl-2 items-center">
                            <p className="font-white text-lg"><PiSignOutBold /></p>
                            {!isCollapsed && <p>Sair</p>}
                        </div>
                                                        : 
                        <div className="flex gap-5 mb-8 hover:text-[#0344f8] hover:bg-[#0344f831] rounded-lg duration-500 ease-in-out cursor-pointer pt-2.5 pb-2.5 pl-2 items-center">
                            <p className="font-white text-lg"><PiSignOutBold /></p>
                            {!isCollapsed && <p>Sair</p>}
                        </div>
                        }
                    </button>
                </nav>
            </main>
        </div>
    )
}