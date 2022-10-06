import { createContext, useState } from "react";
export const apiContext = createContext();

export const StateProvider = ({children})=>{
    const[logedin, setLogedin] = useState(false);
    const [orderId,setOrderId] = useState("");
    const [Ammount,setAmmount] = useState("");
    const [cart,setCart] = useState([]);
   return<apiContext.Provider 
    value={{logedin, setLogedin,cart,setCart,orderId,setOrderId,Ammount,setAmmount}}
    >
    {children}
    </apiContext.Provider>
   
}
