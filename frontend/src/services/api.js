import  axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const login=async (email,password)=>{
    const res=await axios.post(`${API_URL}/auth/login`,{email,password},{withCredentials:true});
    return res.data;
}

export const signup=async(name,email,password)=>{
    const res=await axios.post(`${API_URL}/auth/signup`,{name,email,password},{withCredentials:true});
    return res.data;
}

export const createRoom= async()=>{
    const res=await axios.post(`${API_URL}/rooms`,{},{withCredentials:true});
    return res.data;
}
export const joinRoom=async(roomId)=>{
    const res=await axios.get(`${API_URL}/rooms/${roomId}`,{withCredentials:true});
    return res.data;
}