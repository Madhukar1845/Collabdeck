import { useNavigate } from "react-router-dom";
function Welcome(){
    const navigate=useNavigate();
    return (
        <div style={{ padding: '60px', maxWidth: '600px' }}>
        <h2>CollabDeck</h2>
        <p>A real-time collaborative whiteboard. Draw, sketch, and brainstorm together, live, with anyone in your room.</p>
        <button onClick={()=>navigate('/login')}>Login</button>
        <button onClick={()=>navigate('/signup')}>SignUp</button>
        </div>
    )
};
export default Welcome;
