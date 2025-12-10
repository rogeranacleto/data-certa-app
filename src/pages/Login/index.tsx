import { Link } from "react-router"
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
export function Login(){
    return(
        <div>
            <main>
                <section className="w-screen flex flex-col items-center justify-center h-screen">
                    <div data-aos="fade-up" data-aos-anchor-placement="center-bottom">
                        <div className="flex flex-col items-center mb-5">
                            <h1 className="text-black font-bold text-3xl mb-3.5">Bem-vindo ao DataCerta</h1>
                            <p className="text-gray-400 tracking-wide font-medium">Por favor, faça o login para começar a utilizar</p>
                        </div>
                        <div className="w-full max-w-md overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col mb-5.5 relative">
                                <label className="text-gray-400 font-bold mb-2.5">Email</label>
                                <FaRegUser className="absolute text-lg text-gray-400 top-11 left-3"/>
                                <input type="text" placeholder="nome@exemplo.com" className="text-gray-400 border border-solid rounded-md pt-2 pb-2 pl-12 focus:border-black outline-none"/>
                            </div>
                            <div className="flex flex-col relative">
                                <label className="text-gray-400 font-bold mb-2.5">Senha</label>
                                <TbLockPassword className="absolute text-2xl text-gray-400 top-10.5 left-3"/>
                                <input type="password" placeholder="Digite sua senha" className="text-gray-400 border border-solid rounded-md pt-2 pb-2 pl-12 focus:border-black outline-none"/>
                            </div>
                            <div className="flex flex-col items-center">
                                <button className="w-full bg-[#0044ffee] rounded-lg p-2 mt-4.5 cursor-pointer text-white hover:bg-[#0344f8] duration-700 ease-in-out">Entrar</button>
                                <Link to={"/signup"} className="text-gray-400 mt-15">Não tem uma conta? Cadastre-se</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}