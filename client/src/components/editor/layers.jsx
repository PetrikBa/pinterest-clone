import Image from '../../components/imageComponent/imageComponent';
import useEditorStore from '../../utils/editorStore';

const Layers = () => {
    const { selectedLayer, setSelectedLayer, addText } = 
    useEditorStore();

    const handleSelectedLayer = (layer) => {
        setSelectedLayer(layer);

         if(layer === 'text') {  
        addText();
        }
    }
    
    return (
        <div className="layers">
            <div className="layersTitle">
                <h3>Layers</h3>
                <p>Select a layer to edit</p>
            </div>
            <div
                onClick={() => handleSelectedLayer("text")}
                className={`layer ${selectedLayer === "text" ? "selected" : ""}`}
            >
                <div className="layerImage">
                    <Image path="/general/text.png" />
                </div>                
                <span>Add text</span>
            </div>
                <div
                    onClick={() => handleSelectedLayer("canvas")}
                    className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}
                >
                <div className="layerImage" style={{ backgroundColor: 'teal'}}></div>
                <span>Canvas</span>                
            </div>
        </div>
    );
}
export default Layers;