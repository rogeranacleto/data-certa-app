import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { db } from "../../services/firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChangeModal {
  onClose: (changed: boolean) => void;
}

export function ModalRegister({ onClose }: ChangeModal) {
const [description, setDescription] = useState("");
const [batch, setBatch] = useState("");
const [validity, setValidity] = useState("");
const [supplier, setSupplier] = useState("");

function onCloseModal(){
  onClose(true)
}

async function saveData(e: React.FormEvent){
e.preventDefault();

  try{
    await addDoc(collection(db, "productRegistration"), {
      description, 
      batch,
      validity,
      supplier
    })
      toast.success(
      <div>
        <h2 className="text-white font-bold text-sm">Registro Criado</h2>
        <p className="text-white text-sm">O registro foi criado com sucesso.</p>
      </div>
    );

    onClose(true);
  } catch(error) {
    toast.error(
      <div>
        <h2 className="text-white font-bold text-sm">Erro Inesperado</h2>
        <p className="text-white text-sm">Houve um erro inesperado, ligue para o suporte.</p>
      </div>
    )
  }
}

  return (
    <>
      <motion.div
        className="fixed inset-0 bg-black/70 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onCloseModal()}
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
            onClick={onCloseModal}
          >
            <IoClose className="text-black text-2xl hover:text-red-600 duration-300 ease-in-out"/>
          </button>

          <h2 className="text-black text-lg font-bold mb-1.5">Novo Registro de Produto</h2>
          <p className="text-gray-400 mb-5.5">
            Preencha os campos para criar um novo registro de produto.
          </p>

          <form className="flex flex-col" onSubmit={saveData}>
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
            <button className="text-white bg-[#0044ffee] mt-4 p-2 rounded-lg cursor-pointer hover:bg-[#0344f8] hover:brightness-125 duration-500" type="submit">
              Criar registro
            </button>
          </form>
        </div>
      </motion.div>
    </>
  );
}
