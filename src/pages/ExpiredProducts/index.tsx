import { useEffect, useState, useContext } from "react";
import { RxPencil1 } from "react-icons/rx";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { onSnapshot, collection, query, where, orderBy, doc, deleteDoc } from "firebase/firestore";
import { UpdateContext } from "../../contexts/UpdateContext";
import { db } from "../../services/firebaseConnection";
import toast from "react-hot-toast";
import { ModalUpdate } from "../../components/ModalUpdate";
import { ModalRegister } from "../../components/ModalRegister";
import { AnimatePresence } from "motion/react";
import { LuPackagePlus } from "react-icons/lu";
import type { RegisterProps } from "../TableProducts";

function getFullDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function ExpiredProducts(){
  const { changeUpdateModal } = useContext(UpdateContext);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [products, setProducts] = useState<RegisterProps[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const todayStr = getFullDate(today);

    const copyQuery = query(
      collection(db, "productRegistration"),
      where("validity", "<=", todayStr),
      orderBy("validity", "asc")
    );

    const unsub = onSnapshot(copyQuery, (snapshot) => {
      const list: RegisterProps[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          description: data.description ?? "",
          batch: data.batch ?? "",
          validity: data.validity ?? "",
          supplier: data.supplier ?? ""
        });
      });
      setProducts(list);
    });

    return () => unsub();
  }, []);

  const filteredProducts = products.filter((item) => {
    const text = `${item.description} ${item.batch} ${item.validity} ${item.supplier}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  async function deleteProduct(id: string){
    const docRef = doc(db, "productRegistration", id);
    await deleteDoc(docRef)
      .then(() => toast.success("Registro deletado com sucesso."))
      .catch(() => toast.error("Erro ao deletar registro."));
  }

  function openUpdateModal(register: RegisterProps){
    changeUpdateModal(register);
    setOpenModalUpdate(true);
  }

  return (
    <div className="p-5 bg-gray-400/10 min-h-screen rounded-2xl m-2 pt-5 pb-5">
      <AnimatePresence>{openModalUpdate && <ModalUpdate onCloseModal={() => setOpenModalUpdate(false)} />}</AnimatePresence>
      <AnimatePresence>{openModal && <ModalRegister onClose={() => setOpenModal(false)} />}</AnimatePresence>

      <div className="flex items-center pl-5 pr-5 mb-5 justify-between">
        {products.length === 1 ? <h1 className="font-bold text-2xl">Total de <span className="text-[#0344f8]">{products.length}</span> produto vencido</h1> : <h1 className="font-bold text-2xl">Total de <span className="text-[#0344f8]">{products.length}</span> produtos vencidos</h1>}
        <button className="cursor-pointer" onClick={() => setOpenModal(true)}>
          <span className="flex items-center gap-3 text-sm bg-[#0044ffee] hover:bg-[#0344f8] duration-300 ease-in-out pl-3 pr-3 pt-2 pb-2 text-white rounded-2xl"><LuPackagePlus className="text-lg"/>Cadastrar</span>
        </button>
      </div>

      <div className="relative pl-5 pr-5">
          <input type="text" placeholder="Pesquise um produto" className="border border-solid border-gray-400 w-full p-2 rounded-lg focus:ring-1 focus:ring-[#0044ffee] focus:outline-none text-sm" value={search} onChange={(e) => setSearch(e.target.value)}/>
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
              {filteredProducts.map((item) => (
                <tr className="border-b rounded-lg border-gray-100/20 text-left pt-3.5 pb-3.5 pl-7.5 bg-white z-50 hover:scale-101 shadow-lg hover:shadow-lg duration-300 ease-in-out" key={item.id}>
                <td className="p-7.5 wrap-break-words whitespace-normal rounded-l-2xl">{item.description}</td>
                <td className="p-7.5 wrap-break-words whitespace-normal">{item.batch}</td>
                <td className="p-7.5 wrap-break-words whitespace-normal">{item.validity}</td>
                <td className="p-7.5 wrap-break-words whitespace-normal">{item.supplier}</td>
                <td className="p-7.5 wrap-break-words whitespace-normal">
                <span className="text-white font-bold bg-[#e20303] pl-3 pr-3 pt-2 pb-2 rounded-2xl">Vencido</span>
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
  );
}
