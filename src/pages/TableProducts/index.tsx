import { RxPencil1 } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { UpdateContext } from "../../contexts/UpdateContext";
import { AnimatePresence } from "motion/react";
import { ModalUpdate } from "../../components/ModalUpdate";
import { LuPackagePlus } from "react-icons/lu";
import { ModalRegister } from "../../components/ModalRegister";
export interface RegisterProps{
    id: string;
    description: string;
    batch: string;
    validity: string;
    supplier: string;
}

export function formatDate(date: string){
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`
}

export function TableProducts(){
const {changeUpdateModal} = useContext(UpdateContext);
const [openModalUpdate, setOpenModalUpdate] = useState(false)
const [products, setProducts] = useState<RegisterProps[]>([]);
const [search, setSearch] = useState("");
const [openModal, setOpenModal] = useState(false);
function changeModal(){
    setOpenModal(true)
}
useEffect(() => {
    async function loadProductRegistration(){
        const unsub = onSnapshot(collection(db, "productRegistration"),(snapshot) => {
            let listProductRegistration: RegisterProps[] = [];
            snapshot.forEach((doc) => {
                listProductRegistration.push({
                    id: doc.id,
                    description: doc.data().description ?? "",
                    batch: doc.data().batch ?? "",
                    validity: doc.data().validity ?? "",
                    supplier: doc.data().supplier ?? ""
                })
            })
            setProducts(listProductRegistration)
        })
    }
    loadProductRegistration();
},[])   

const filteredProdutcs = products.filter((item) => {
    const textComplete = Object.values(item).join(" ").toLowerCase();
    const normalizedSearch = search.toLowerCase();
    return textComplete.includes(normalizedSearch);
});

async function deleteProduct(id: string){
    const docRef = doc(db, "productRegistration", id)
    await deleteDoc(docRef)
    .then(() => {
        toast.success(
            <div>
                <h2 className="text-white font-bold text-sm">Registro Deletado</h2>
                <p className="text-gray-100/60 text-sm">Registro deletado com sucesso.</p>
            </div>
        )
    })
    .catch(() => {
        toast.error(
            <div>
                <h2 className="text-white font-bold text-sm">Erro Inesperado</h2>
                <p className="text-gray-100/60 text-sm">Ocorreu um erro inesperado, acione o suporte.</p>
            </div>
        )
    })
}

function openUpdateModal(register: RegisterProps){
    changeUpdateModal(register)
    setOpenModalUpdate(true)
}

    return(
        <div className="p-5 bg-gray-400/10 min-h-screen rounded-2xl m-2 pt-5 pb-5">
        <AnimatePresence>
                {openModalUpdate && (<ModalUpdate onCloseModal={() => setOpenModalUpdate(false)}/>)}
        </AnimatePresence>
        <AnimatePresence>
                {openModal && (<ModalRegister onClose={() => setOpenModal(false)}/>)}
        </AnimatePresence>
            <div className="flex items-center pl-5 pr-5 mb-5 justify-between">
                {products.length === 1 ? <h1 className="font-bold text-2xl">Total de <span className="text-[#0344f8]">{products.length}</span> produto cadastrado</h1> : <h1 className="font-bold text-2xl">Total de <span className="text-[#0344f8]">{products.length}</span> produtos cadastrados</h1>}
                <button className="cursor-pointer" onClick={() => changeModal()}>
                    <span className="flex items-center gap-3 text-sm bg-[#0044ffee] hover:bg-[#0344f8] duration-300 ease-in-out pl-3 pr-3 pt-2 pb-2 text-white rounded-2xl"><LuPackagePlus className="text-lg"/>Cadastrar</span>
                </button>
            </div>
            <div className="relative pl-5 pr-5">
                <input type="text" placeholder="Pesquise um registro pela descrição, lote, validade ou fornecedor" className="border border-solid border-gray-400 w-full p-2 rounded-lg focus:ring-1 focus:ring-[#0044ffee] focus:outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <FaSearch className="absolute top-2 right-10 text-2xl text-[#0044ffee]"/>
            </div>
            <div className="overflow-x-auto">
                <div className="ml-8 mr-8">
                    <table className="w-full min-w-max text-left border-separate border-spacing-y-3">
                        <thead>
                            <tr className="text-gray-400 text-sm">
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">DESCRIÇÃO</th>
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">LOTE</th>
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">VALIDADE</th>
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">FORNECEDOR</th>
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">STATUS</th>
                                <th className="text-left pt-3.5 pb-3.5 pl-7.5">AÇÕES</th>
                            </tr>
                        </thead>
                    
                        <tbody className="text-black w-full text-sm pl-8 pr-8">
                            {filteredProdutcs.map((item) => (
                            <tr className="border-b rounded-lg border-gray-100/20 text-left pt-3.5 pb-3.5 pl-7.5 bg-white z-50 hover:scale-101 shadow-lg hover:shadow-lg duration-300 ease-in-out" key={item.id}>
                                <td className="p-7.5 wrap-break-words whitespace-normal rounded-l-2xl">{item.description}</td>
                                <td className="p-7.5 wrap-break-words whitespace-normal">{item.batch}</td>
                                <td className="p-7.5 wrap-break-words whitespace-normal">{formatDate(item.validity)}</td>
                                <td className="p-7.5 wrap-break-words whitespace-normal">{item.supplier}</td>
                                <td className="p-7.5 wrap-break-words whitespace-normal">
                                {(() => {
                                    const raw = item.validity ?? "";
                                    let validity;
                                    if (raw) {
                                        const [year, month, day] = raw.split("-").map(Number);
                                        validity = new Date(year, month - 1, day);
                                    } else {
                                        validity = new Date(raw);
                                    }
                                    if (!validity || isNaN(validity.getTime())) {
                                        return (
                                            <span className="text-white font-bold bg-gray-400 pl-3 pr-3 pt-2 pb-2 rounded-2xl">-</span>
                                        );
                                    }
                                    const today = new Date();
                                    today.setHours(0, 0, 0, 0);
                                    const copyValidity = new Date(validity.getTime());
                                    copyValidity.setHours(0, 0, 0, 0);
                                    const msPerDay = 1000 * 60 * 60 * 24;
                                    const diffDays = Math.round((copyValidity.getTime() - today.getTime()) / msPerDay);
                                    return copyValidity.getTime() <= today.getTime() ? (
                                    <span className="text-white font-bold bg-[#e20303] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vencido</span>
                                    ) : diffDays === 5 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 5 dias</span>
                                    ) : diffDays === 10 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 10 dias</span>
                                    ) : diffDays === 15 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 15 dias</span>
                                    ) : diffDays === 20 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 20 dias</span>
                                    ) : diffDays === 25 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 25 dias</span>
                                    ) : diffDays === 30 ? (
                                    <span className="text-white font-bold bg-[#d4c603] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vence em 30 dias</span>
                                    ) : (
                                    <span className="text-white font-bold bg-[#07d300] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Válido</span>
                                    );
                                })()}
                                </td>
                                <td className="rounded-r-2xl">
                                    <td className="flex gap-6 items-center p-7.5">
                                        <button className="cursor-pointer hover:scale-120 duration-300 ease-in-out" onClick={() => openUpdateModal(item)}><RxPencil1/></button>
                                        <button className="cursor-pointer hover:scale-120 hover:text-red-600 duration-300 ease-in-out" onClick={() => deleteProduct(item.id)}><FaRegTrashAlt/></button>
                                    </td>
                                </td>
                            </tr>
                            ))}
                            {products.length === 0 && (<tr><td colSpan={6} className="p-7.5 text-center">Nenhum registro</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}