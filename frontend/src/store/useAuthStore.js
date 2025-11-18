import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : ""

export const useAuthStore = create((set,get) =>({
    account:{
        username:"",
        email:"",
        password:"",
        confirmPass:"",
    },

    isLoggedIn : false,
    loading:false,
    user : null,

    login : (userData)=> set({
        isLoggedIn:true ,
        user:userData,
        account:{ ...get().account, username: userData.username, email: userData.email }
    }),
    
    logout : () => set({
        isLoggedIn:false, 
        user: null,
        account: { username: "", email: "", password: "", confirmPass: "" }}),

    setAccount : (account) => set({account}),
    resetAccount : () => set({account:{username:"",email:"",password:"",confirmPass:""}}),

    addUser : async() => {
        set({loading:true});
        const {resetAccount,login} = get();
        try {
            const {account} = get();
            const {data} = await axios.post(`${BASE_URL}/api/auth/register`,account)
            toast.success("Register Successfull!")
            login(data.data);
        } catch (error) {
            const message = error.response?.data?.message;
            console.log("Error in addUser function",error);
            if(message === "User exist"){
                toast.error("User exist")
            }else if(message === "Password not match"){
                toast.error("Password not match")
            }else{
                toast.error("Something went wrong")
            }
            resetAccount();
        } finally {
            set({loading:false})
        }
    },

    fetchUser : async(email,password) => {
        set({loading:true})
        const {resetAccount,login} = get();
        try{    
            const {data} = await axios.post(`${BASE_URL}/api/auth/login`,{email,password})
            toast.success("Login Successfull!")
            login(data.data);
            return data.data;
        }catch (error) {
            const message = error.response?.data?.message;
            if(message === "User not found"){
                toast.error("User not found")
            }else if(message === "Incorrect password"){
                toast.error("Incorrect. Try Again")
            }else{
                toast.error("Something went wrong")
            }
            resetAccount();
            return null;
        } finally {
            set({loading:false})
        }
    },
}))