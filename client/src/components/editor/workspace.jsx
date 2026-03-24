import useEditorStore from '../../utils/editorStore';
import Image from '../../components/imageComponent/imageComponent';
import { useEffect, useRef } from 'react';

const Workspace = ({previewImg}) => {

    const { 
        setSelectedLayer, 
        textOptions, 
        setTextOptions, 
        canvasOptions, 
        setCanvasOptions
    } = useEditorStore();

    useEffect (() => {
        if (!previewImg.width || !previewImg.height) return;

        const canvasHeight = (375 * previewImg.height) / previewImg.width;

        setCanvasOptions({
            ...canvasOptions,
            height: canvasHeight,
            orientation: canvasHeight > 375 ? 'portrait' : 'landscape',
            size: 'original'
        });
    },[previewImg.width, previewImg.height, setCanvasOptions]);

    const itemRef = useRef(null);
    const containerRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });
    const dragging = useRef(false);

    const handleMouseMove = (e) => {
        if(!dragging.current) return;
        setTextOptions({
            ...textOptions,
            left: e.clientX - offset.current.x,
            top: e.clientY - offset.current.y
        })
    }

    const handleMouseUp = (e) => {
        dragging.current = false;
    }

    const handleMouseLeave = (e) => {
        dragging.current = false;
    }

    const handleMouseDown = (e) => {

        setSelectedLayer('text');
        dragging.current = true;
        offset.current = {
            x: e.clientX - textOptions.left,
            y: e.clientY - textOptions.top    
        }  
    }
    
    
    return (
        <div className="workspace">
            <div 
                className="canvas" 
                style={{ 
                    height: canvasOptions.height, 
                    backgroundColor: canvasOptions.backgroundColor 
                }}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                ref={containerRef}
            >
                <img src={previewImg.url} alt="" />
                {textOptions.text && (
                    <div 
                        className="text"
                        style={{
                            left: textOptions.left, 
                            top: textOptions.top, 
                            fontSize: `${textOptions.fontSize}px`
                        }}
                        ref={itemRef}
                        onMouseDown={handleMouseDown}
                    >
                        <input 
                            type="text" 
                            value={textOptions.text} 
                            onChange={e=> setTextOptions({...textOptions, text:e.target.value})
                        }
                        style={{
                            color: textOptions.color,
                        }}
                        />
                        <div 
                            className="deleteTextButton" 
                            onClick={()=> setTextOptions({...textOptions, text:''})}
                        >
                            <Image path="/general/delete.svg" />
                        </div>    
                    </div>
                )}
            </div>
        </div>
    );
}
export default Workspace;