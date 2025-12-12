import { createContext, type ReactNode } from "react";
import { useState } from "react";
import { type RegisterProps } from "../pages/TableProducts";

interface UpdateProps{
    products: RegisterProps | null;
    changeUpdateModal: (register: RegisterProps) => void;
}
interface ChildrenProps{
    children: ReactNode
}

export const UpdateContext = createContext({} as UpdateProps)

const UpdateProvider = ({children}: ChildrenProps) => {
const [products, setProducts] = useState<RegisterProps | null>(null)

const changeUpdateModal = (register: RegisterProps) => {
    setProducts(register)
}
    return(
        <UpdateContext.Provider value={{changeUpdateModal, products}}>
            {children}
        </UpdateContext.Provider>
    )
}
export { UpdateProvider };