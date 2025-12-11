import { Link } from "react-router"
import { TbLockPassword } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { AuthContext } from "../../contexts/AuthContext";

export function Login(){
const { login } = useContext(AuthContext);
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [userLoginDetail, setUserLoginDetail] = useState({});

const navigate = useNavigate();

async function loginEffect(){
    await signInWithEmailAndPassword(auth, email, password)
        .then((value) => {
            setUserLoginDetail({
                uid: value.user.uid,
                email: value.user.email,
            })
            toast.success(
            <div>
                <h2 className="text-white font-bold text-sm">Login Efetuado</h2>
                <p className="text-white text-sm">Login efetuado com sucesso.</p>
            </div>
            )
            navigate("/admin")
            login(userLoginDetail)

        }).catch((erro) => {
            if(erro){
                toast.error(
                    <div>
                        <h2 className="text-white font-bold text-sm">Erro no Login</h2>
                        <p className="text-white text-sm">Ocorreu um erro nas credenciais.</p>
                    </div>
                )
            }       
        })
}
    return(
        <div>
            <main>
                <section className="w-screen flex flex-col items-center justify-center h-screen bg-white">
                    <div>
                        <div className="flex flex-col items-center mb-5">
                            <h1 className="text-black font-bold text-3xl mb-3.5">Bem-vindo ao DataCerta</h1>
                            <p className="text-gray-400 tracking-wide font-medium">Por favor, faça o login para começar a utilizar</p>
                        </div>
                        <div className="w-full max-w-md overflow-hidden flex flex-col justify-center">
                            <div className="flex flex-col mb-5.5 relative">
                                <label className="text-gray-400 font-bold mb-2.5">Email</label>
                                <FaRegUser className="absolute text-lg text-gray-400 top-11 left-3"/>
                                <input type="text" placeholder="nome@exemplo.com" className="text-gray-400 border border-solid rounded-md pt-2 pb-2 pl-12 focus:border-black outline-none" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            </div>
                            <div className="flex flex-col relative">
                                <label className="text-gray-400 font-bold mb-2.5">Senha</label>
                                <TbLockPassword className="absolute text-2xl text-gray-400 top-10.5 left-3"/>
                                <input type="password" placeholder="Digite sua senha" className="text-gray-400 border border-solid rounded-md pt-2 pb-2 pl-12 focus:border-black outline-none" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            </div>
                            <div className="flex flex-col items-center">
                                <button className="w-full bg-[#0044ffee] rounded-lg p-2 mt-4.5 cursor-pointer text-white hover:bg-[#0344f8] duration-700 ease-in-out" onClick={loginEffect}>Entrar</button>
                                <Link to={"/signup"} className="text-gray-400 mt-15">Não tem uma conta? Cadastre-se</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}