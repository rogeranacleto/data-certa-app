import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"
export function Layout(){

    return(
        <>
            <div className="flex bg-white">
                <Sidebar />
                <main className="p-4 overflow-y-auto flex-1 bg-white">
                    <Outlet />
                </main>
            </div>   
        </>
    )
}