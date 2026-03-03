import './postInteractions.css'; 
import Image from '../imageComponent/imageComponent';

const PostInteractions = () => {
    return (
        <div className="postInteractions">
            <div className="interactionIcons">
               <Image path="general/react.svg"/>
               2713
               <Image path="general/share.svg"/>
               <Image path="general/more.svg"/>
            </div>
            <button>Save</button>
        </div>
    );
}

export default PostInteractions;