import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { login } from "../services/api";

function Login(){
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await login(email,password);
            navigate('/dashboard');
        }catch(err){
            setError(err.response?.data?.text || 'Login failed. Check your credentials.')
        }
} 
    return (
        <form onSubmit={handleSubmit}>
        <h2>LoginPage</h2>
        <input value={email} type='email' placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input value={password} type='password' placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type='submit'>Login</button>
        {error && <p>{error}</p>}
    </form>
    )
} 
export default Login;