import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import {
  clipboard_msg,
  clipboard_err_msg,
  number_Limit_grater,
  number_Limit_lesser,
  complexity,
  limitList
} from "./utils/messages";
import  notifyToast  from "./utils/Toastify";
export default function App() {
  const [password, setPassword] = useState("");
  const [passlist, setPasslist] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [length, setLength] = useState(10);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);


  useEffect(() => {
    let pass = localStorage.getItem("generatedPasswords")
    setPasslist(JSON.parse(pass))
    console.log(passlist);
  }, [passwords])


  const generatePassword = () => {
    if(passlist?.length===8){
      notifyToast('error',limitList);
    }
    if (length >= 6 && length <= 20) {
      if (
        !includeUppercase &&
        !includeLowercase &&
        !includeNumbers &&
        !includeSymbols
      ) {
        setPassword("");
        notifyToast('error',complexity);
        return;
      }
      let charset = "";
      if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
      if (includeNumbers) charset += "0123456789";
      if (includeSymbols) charset += "!@#$%^&*()";

      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        generatedPassword += charset.charAt(
          Math.floor(Math.random() * charset.length)
        );
      }
      const MAX_PASSWORDS = 8;
      setPassword(generatedPassword);
      const updatedPasswords = [...passwords, generatedPassword].slice(-MAX_PASSWORDS);
      setPasswords(updatedPasswords);
      localStorage.setItem(
        "generatedPasswords",
        JSON.stringify(updatedPasswords)
      );
    } else {
      if (length < 6) {
        setPassword("");
        notifyToast('error',number_Limit_grater);
        return;
      } else {
        setPassword("");
        notifyToast('error',number_Limit_lesser);

        return;
      }
    }
  };

  const handleCopyClick = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      notifyToast('success',clipboard_msg);
    } else {
      notifyToast('success',clipboard_err_msg);
    }
  };  const handleCopy = (pass) => {
    console.log(pass);
    if (pass) {
      navigator.clipboard.writeText(pass);
      notifyToast('success',clipboard_msg);
    } else {
      notifyToast('success',clipboard_err_msg);
    }
  };


  return (
    <>
      <div className=" h-screen flex justify-center md:items-center py-11 bg-gradient-to-br from-orange-300 to-amber-100">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />

        <div className="">
          <div className="flex flex-col items-center mb-4">
            <h1 className="text-4xl md:text-6xl font-bold m-7 ">
              Random Password Generator
            </h1>
            < p className="px-5 font-mono">
              Create strong and secure passwords to keep your account safe
              online.
            </p>
          </div>
          <div className="md:flex justify-center">
            <div>


              <div className=" h-16 sm:w-96 mb-1 flex items-center rounded-3xl justify-between border-2 border-gray-500 bg-slate-100">
                <p className="text-xl md:text-2xl">{password}</p>
                {password && (
                  <button
                    onClick={handleCopyClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white mx-2 py-1 px-2 rounded-xl"
                  >
                    {" "}
                    copy
                  </button>
                )}
              </div>
              <div className="flex justify-center">

                <div>
                  {/* {passlist?.map((pas,index) => {
                    return (<>
                      <div key={index} className=" mb-1 flex ">
                        <p className="mr-2 font-mono">{pas}</p>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white  p-1 rounded-xl" onClick={()=>handleCopy(pas)}>
                          copy
                        </button>
                      </div>
                    </>
                    )
                  }


                  )} */}
                </div>
              </div>
            </div>
            <div className="mx-8 md:mx-12">
              <div className="mb-4">
                <label htmlFor="password-length" className="mr-2 font-mono">
                  Password Length:
                </label>
                <input
                  type="number"
                  id="password-length"
                  className="ml-[5.9rem] p-2 border border-gray-300 rounded"
                  value={length}
                  min="6"
                  max="20"
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="include-uppercase" className="font-mono">
                  Include Uppercase Letters
                </label>
                <input
                  type="checkbox"
                  id="include-uppercase"
                  className="ml-[3.5rem] mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  checked={includeUppercase}
                  onChange={() => setIncludeUppercase(!includeUppercase)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="include-lowercase" className="font-mono">
                  Include Lowercase Letters
                </label>
                <input
                  type="checkbox"
                  id="include-lowercase"
                  className="ml-[3.55rem] mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  checked={includeLowercase}
                  onChange={() => setIncludeLowercase(!includeLowercase)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="include-numbers" className="font-mono">Include Numbers</label>
                <input
                  type="checkbox"
                  id="include-numbers"
                  className="ml-[9.1rem] mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers(!includeNumbers)}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="include-symbols" className="font-mono">Include Symbols</label>
                <input
                  type="checkbox"
                  id="include-symbols"
                  className="ml-[9.1rem] mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-blue-500 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols(!includeSymbols)}
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-600 font-mono text-white py-2 px-4 rounded"
                onClick={generatePassword}
              >
                Generate Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
