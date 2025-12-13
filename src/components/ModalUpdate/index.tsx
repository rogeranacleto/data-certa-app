import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { db } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";
import { type RegisterProps } from "../../pages/TableProducts";
import { UpdateContext } from "../../contexts/UpdateContext";
import { useContext } from "react";
interface ChangeModal {
  onCloseModal: (changed: boolean) => void;
}

export function ModalUpdate({ onCloseModal }: ChangeModal) {
const {products} = useContext(UpdateContext);
const [description, setDescription] = useState(products?.description || "");
const [batch, setBatch] = useState(products?.batch || "");
const [validity, setValidity] = useState(products?.validity || "");
const [supplier, setSupplier] = useState(products?.supplier || "");

function onCloseModalUpdate(){
  onCloseModal(true)
}

async function saveUpdateRegister(id: RegisterProps | null){
  if(!id) return null;
  onCloseModal(true);

  const refDoc = doc(db, "productRegistration", id?.id);
  await updateDoc(refDoc, {
    description: description,
    batch: batch,
    validity: validity,
    supplier: supplier,
  })
  .then(() => {
    toast.success(
        <div>
          <h2 className="text-white font-bold text-sm">Registro Atualizado</h2>
          <p className="text-white text-sm">O registro foi atualizado com sucesso.</p>
        </div>
    );
  }).catch(() => {
    toast.error(
        <div>
          <h2 className="text-white font-bold text-sm">Erro Inesperado</h2>
          <p className="text-white text-sm">Ocorreu um erro inesperado, ligue para o suporte.</p>
        </div>
    )
  })
}

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCloseModalUpdate()}
      />

      <motion.div
        className="fixed inset-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="bg-white w-lg flex flex-col border border-gray-100/20 p-5.5 rounded-lg relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="cursor-pointer absolute right-5 top-4"
            onClick={onCloseModalUpdate}
          >
            <IoClose className="text-black text-2xl hover:text-red-600 duration-300 ease-in-out"/>
          </button>

          <h2 className="text-black text-lg font-bold mb-1.5">Atualização de Registro de Produto</h2>
          <p className="text-gray-400 mb-5.5">
            Preencha os campos para atualizar esse registro de produto.
          </p>

          <div className="flex flex-col">
            <div className="flex justify-between gap-4">
              <div className="flex flex-col w-full">
                <label className="text-black pb-2 font-bold">Descrição</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded-lg text-black mb-6.5 focus:border-gray-400 outline-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ex: Arroz Integral"
                  required
                />
                <label className="text-black pb-2 font-bold">Lote</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded-lg text-black mb-6.5 focus:border-gray-400 outline-none"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  placeholder="Ex: 56262"
                  required
                />
                <label className="text-black pb-2 font-bold">Validade</label>
                <input
                  type="date"
                  className="border border-gray-300 p-2 rounded-lg text-black mb-6.5 focus:border-gray-400 outline-none"
                  value={validity}
                  onChange={(e) => setValidity(e.target.value)}
                  required
                />
                <label className="text-black pb-2 font-bold">Fornecedor</label>
                <input
                  type="text"
                  className="border border-gray-300 p-2 rounded-lg text-black mb-6.5 focus:border-gray-400 outline-none"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Ex: Teobaldo LTDA"
                  required
                />
              </div>
            </div>
            <button className="text-white bg-[#0044ffee] mt-4 p-2 rounded-lg cursor-pointer hover:bg-[#0344f8] hover:brightness-125 duration-500" type="button" onClick={() => saveUpdateRegister(products)}>
              Atualizar registro
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
