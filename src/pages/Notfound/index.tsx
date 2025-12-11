import { Link } from "react-router";
export function Notfound(){
    return(
        <div>
            <div className="max-w-screen min-h-screen bg-white flex justify-center">
                <div className="mt-90 flex flex-col items-center max-w-lg w-full">
                    <h1 className="text-black font-bold text-7xl mb-2">404</h1>
                    <h2 className="text-black font-medium text-4xl mb-5">Ops, essa página não existe!</h2>
                    <Link to={"/login"} className="w-full flex items-center justify-center">
                        <button className="w-[40%] bg-[#0044ffee] rounded-lg p-2 mt-4.5 cursor-pointer text-white hover:bg-[#0344f8] duration-700 ease-in-out">Voltar</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}