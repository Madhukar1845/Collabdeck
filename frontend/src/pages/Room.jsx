import { socket } from "../services/socket";
import { useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import CanvasStage from "../components/canvas/CanvasStage";
import Toolbar from "../components/Toolbar";
function Room(){
    const {roomId}=useParams()
    const [shapes,setShapes]=useState([]);
    const [tool,setTool]=useState('pen');
    const [color,setColor]=useState('#000000');
    const [strokeWidth,setStrokeWidth]=useState(2);
    const [users,setUsers]=useState([]);
    useEffect(()=>{
        socket.connect()
        socket.emit('room:join',{roomId})   
        socket.on('room:history',(events)=>{
            setShapes(events)
        });
        socket.on('canvas:newEvent',(event)=>{
            setShapes((prev)=>[...prev,event])
        })
        socket.on('room:users',(usersList)=>{
            setUsers(usersList);
        })
        return ()=>{
            socket.disconnect();
        }
    },[roomId]);
    const handleDrawEnd=(data)=>{
        let payload;
        let type;
        if (tool=='pen'){
            type='draw';
            const points=[];
            for (let i=0;i<data.length;i+=2){
                points.push({x:data[i], y:data[i+1]});
            }
            payload={points,color,strokeWidth};
        }else if(tool=='rectangle'){
            type='rectangle';
            payload={...data,color,strokeWidth}
        }else if (tool=='ellipse'){
            type='ellipse'
            payload={...data,color,strokeWidth};
        }
        socket.emit('canvas:event',{roomId,type,payload});
    }
    return (
    <>
    <div style={{ padding: '24px' }}>
    <h2>Room:{roomId}</h2>
    <p>In this room:{users.map(u=>u.userName).join(',')}
    </p>
    <Toolbar tool={tool} setTool={setTool} color={color} setColor={setColor} strokeWidth={strokeWidth} setStrokeWidth={setStrokeWidth}></Toolbar>
    <CanvasStage shapes={shapes} onDrawEnd={handleDrawEnd} tool={tool} setTool={setTool} color={color} strokeWidth={strokeWidth}/>
    </div>
    </>
    )
}
export default Room;