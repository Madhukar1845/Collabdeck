function Toolbar({tool,setTool,color,setColor,strokeWidth,setStrokeWidth}){
    return (
        <div>
            <input type='color' value={color} onChange={(e)=>setColor(e.target.value)}/>
            <input type='range' min='1' max='20' value={strokeWidth} onChange={(e)=>setStrokeWidth(Number(e.target.value))}/>
            <button onClick={()=>setTool('pen')} disabled={tool==='pen'}>Pen</button>
            <button onClick={()=>setTool('rectangle')} disabled={tool==='rectangle'}>Rectangle</button>
            <button onClick={()=>setTool('ellipse')} disabled={tool==='ellipse'}>Ellipse</button>
        </div>
    )
}
export default Toolbar;