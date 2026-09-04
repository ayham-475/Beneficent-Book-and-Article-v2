import { div } from "framer-motion/client";
import { createContext, useContext } from "react";
import { useState } from "react";
import MySnakbar from "../Components/Toast";
export const ToastContext = createContext({});


export const ToastProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
   

    function showHideToast(message) {
        setOpen(true);
        setTimeout(() => {
            setOpen(false)
        }, 2000)
        setMessage(message)
    }
    return(
 <div>
   <MySnakbar open={open}  message={message} />
    

    <ToastContext.Provider value={{ showHideToast }}>
        {children}

    </ToastContext.Provider>

      </div>
    )
     

}

// export const useToast=useContext(ToastContext)