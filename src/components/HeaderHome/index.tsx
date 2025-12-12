import { Link } from "react-router"
export function HeaderHome(){
function scrollToSection(id: string){
    const element = document.getElementById(id)
    if (element) element.scrollIntoView({behavior: "smooth"})
}    
    return(
        <div className="hidden max-w-6xl w-full lg:block md:block">
            <div className="bg-white rounded-lg mt-8 min-h-17 flex justify-between items-center pl-7 pr-7 shadow-2xl">
                <Link to={"/"}>
                    <h1 className="font-bold text-lg">DataCerta</h1>
                </Link>
                <nav className="flex gap-7">
                    <button className="text-sm hover:bg-[#d5d5d583] pt-2 pb-2 pl-3 pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("about")}>Sobre</button>
                    <button className="text-sm hover:bg-[#d5d5d583] pt-2 pb-2 pl-3 pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("app")}>App</button>
                    <button className="text-sm hover:bg-[#d5d5d583] pt-2 pb-2 pl-3 pr-3 duration-300 ease-in-out rounded-sm cursor-pointer" onClick={() => scrollToSection("proposal")}>Proposta</button>
                </nav>
                <div className="flex gap-7">
                    <Link to={"/login"}><button className="text-sm cursor-pointer bg-[#D5D5D5] hover:bg-[#c7c2c2] duration-300 ease-in-out rounded-sm pt-2 pb-2 pl-3 pr-3">Entrar</button></Link>
                    <Link to={"/signup"}><button className="text-sm cursor-pointer bg-black hover:bg-black/80 duration-300 ease-in-out rounded-sm text-white pt-2 pb-2 pl-3 pr-3">Começar grátis</button></Link>
                </div>
            </div>
        </div>
    )
}