import { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ( {children} ) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "", 
        password: "",
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: "", 
        password: "",
    });
    

    // console.log("registerInfo",registerInfo);

    useEffect(()=>{ 
        const user = localStorage.getItem("User")
        setUser(JSON.parse(user));
    },[]);

    
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Set the Content-Type header
            },
            body: JSON.stringify(registerInfo), // Stringify the data
        };

        try {
            const response = await fetch(`${baseUrl}/users/register`, requestOptions);
            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("User", JSON.stringify(data));
                setUser(data);
            } else {
                setRegisterError(response);
            }
        } catch (error) {
            console.error(error);
            setRegisterError({ error: "An error occurred." });
        } finally {
            setIsRegisterLoading(false);
        }
    }, [registerInfo]);

   const loginUser = useCallback(async (e)=>{
    e.preventDefault()
    setIsLoginLoading(true)
    setLoginError(null)
       const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
       );
        
       setIsLoginLoading(false)

       if(response.error){
        return setLoginError(response)
       }
       localStorage.setItem("User", JSON.stringify(response))
       setUser(response);
    }, [loginInfo]);

//    console.log(loginInfo)
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

  

    const logoutUser = useCallback(()=>{
        localStorage.removeItem('User');
        setUser(null)
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                 loginUser,
                 loginError,
                 loginInfo,
                 updateLoginInfo,
                 isLoginLoading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
