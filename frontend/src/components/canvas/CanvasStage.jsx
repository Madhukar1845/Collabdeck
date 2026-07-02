import {Layer,Stage,Line, Rect, Ellipse} from "react-konva";
import {useState} from "react";

function CanvasStage({shapes,onDrawEnd,tool,setTool,color,strokeWidth}){
    const [currentLine,setCurrentLine]=useState([]);
    const [isDrawing,setIsDrawing]=useState(false);
    const [startPoint,setStartPoint]=useState({x:0,y:0});
    const [currentShape,setCurrentShape]=useState(null);
    
    const handleMouseDown=(e)=>{
        setIsDrawing(true);
        const pos=e.target.getStage().getPointerPosition();
        setStartPoint(pos);
        if (tool=='pen'){
        setCurrentLine([pos.x,pos.y]);
        }
};

    const handleMouseUp=()=>{
        setIsDrawing(false);
        if (tool=='pen'){
        onDrawEnd(currentLine);
        setCurrentLine([]);
        }
        else if(tool=='rectangle' || tool=='ellipse'){
            onDrawEnd(currentShape);
            setCurrentShape(null);
        }
    }

    const handleMouseMove=(e)=>{
        if (!isDrawing) return ;
        const pos=e.target.getStage().getPointerPosition();
        if (tool=='pen'){
        setCurrentLine((prev)=>[...prev,pos.x,pos.y]);
        }
        else if(tool=='rectangle'){
            const width=startPoint.x-pos.x;
            const height=startPoint.y-pos.y;
            setCurrentShape({x:startPoint.x,y:startPoint.y,width,height})
        }
        else if(tool=='ellipse'){
            const radiusX=Math.abs(startPoint.x-pos.x)
            const radiusY=Math.abs(startPoint.y-pos.y);
            setCurrentShape({x:startPoint.x,y:startPoint.y,radiusX,radiusY})
        }
    }
    return (
        <div style={{ border: '1px solid #ccc', display: 'inline-block', background: 'white' }}>
        <Stage width={800} height={600} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
            <Layer>
                {shapes.map((shape,i)=>{
                    if (shape.type=='draw'){
                        return <Line 
                    key={i}
                    points={shape.payload.points.flatMap(p=>[p.x,p.y])}
                    stroke={shape.payload.color}
                    strokeWidth={shape.payload.strokeWidth} 
                    ></Line>
                }else if (shape.type=='rectangle'){
                    return <Rect key={i} x={shape.payload.x} y={shape.payload.y} width={shape.payload.width} height={shape.payload.height} stroke={shape.payload.color} strokeWidth={shape.payload.strokeWidth}/>
                }
                else if (shape.type=='ellipse'){
                    return <Ellipse key={i} x={shape.payload.x} y={shape.payload.y} radiusX={shape.payload.radiusX} radiusY={shape.payload.radiusY} stroke={shape.payload.color} strokeWidth={shape.payload.strokeWidth}/>
                }
                return null;
})}
                <Line points={currentLine} stroke={color} strokeWidth={strokeWidth}></Line>
                {tool==='rectangle' && currentShape && (
                    <Rect x={currentShape.x} y={currentShape.y} width={currentShape.width} height={currentShape.height} stroke={color} strokeWidth={strokeWidth}/>
                )}
                {tool==='ellipse' && currentShape && (
                    <Ellipse x={currentShape.x} y={currentShape.y} radiusX={currentShape.radiusX} radiusY={currentShape.radiusY} stroke={color} strokeWidth={strokeWidth}/>
                )}
            </Layer>

        </Stage>
        </div>
    )
}
export default CanvasStage;