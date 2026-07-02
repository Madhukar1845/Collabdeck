import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createRoom, joinRoom } from "../services/api";
function Dashboard(){
    const [joinCode,setJoinCode]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('')
    const handleCreate = async()=>{
        try{
            const data=await createRoom();
            navigate(`/room/${data.room.roomId}`)
        }catch(err){
            setError(err.response?.data?.text || 'Failed to create room. Try again.');
        }

    }
    const handleJoin=async()=>{
        try{
            await joinRoom(joinCode);
            navigate(`/room/${joinCode}`)
        }catch(err){
            setError(err.response?.data?.text || 'Failed to join room. Check the room code.')
        }
    }
    return (
        <>
    <h2>Dashboard</h2>
    <div>
    <button onClick={handleCreate}>Create Room</button>
    </div>
    <div style={{ marginTop: '12px' }}>
    <input value={joinCode} type='text' placeholder="Enter room code" onChange={(e) => setJoinCode(e.target.value)} />
    <button onClick={handleJoin}>Join Room</button>
</div>{error && <p>{error}</p>}
    </>
    )
}
export default Dashboard;
    