import './profilePage.css'; 
import Image from '../../components/imageComponent/imageComponent';
import { useState } from 'react';
import Gallery from '../../components/gallery/gallery';
import Collections from '../../components/collections/collections';

const ProfilePage = () => {

    const [type, setType] = useState("saved");

    return (
        <div className="profilePage">
            <Image 
                className="profileImg" 
                path="general/noAvatar.png" 
                alt=""
                w={100}
                h={100}
            />
            <h1 className='profileName'>John Doe</h1>
            <span className='profileUsername'>@john.doe</span>
            <div className="followCounts">10 followers . 20 followings</div>
            <div className='profileInteractions'>
                <Image path="general/share.svg" alt="Some description"/>
                <div className='profileButtons'>
                    <button>Message</button>
                    <button>Follow</button>
                </div>
                <Image path="general/more.svg" alt="Some description"/>
            </div>
            <div className="profileOptions">
                <span onClick={() => setType("created")} className={type==="created" ? "active" : ""}>Created</span>
                <span onClick={() => setType("saved")} className={type==="saved" ? "active" : ""}>Saved</span>
            </div>
            {type ==="created" ? <Gallery /> : <Collections />}
        </div>
    );
}

export default ProfilePage; 