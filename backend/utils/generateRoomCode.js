const generateCode=()=>{
    const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let roomCode=''
    for(let i=0;i<6;i++){
        const r_ind=Math.floor(Math.random()*chars.length);
        roomCode+=chars[r_ind];
    }
    return roomCode;
}

export default generateCode;