import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../services/api";

function Signup(){
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('');
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await signup(name,email,password);
            navigate('/dashboard');
        }catch(err){
            setError(err.response?.data?.text ||`Signup failed.Try again.`)
        }
    }
    return (
    <form onSubmit={handleSubmit}>
    <h2>Signup Page</h2>
    <input value={name} type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
    <input value={email} type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
    <input value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
    <button type="submit">Signup</button>
    {{error} &&<p>{error}</p>}
    </form>
    )
}
export default Signup;