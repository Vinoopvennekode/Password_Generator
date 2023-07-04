import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notifyToast=(type,message,options={})=>{
    toast[type](message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        ...options
      });
}

export default notifyToast;