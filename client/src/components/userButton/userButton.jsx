import { useState } from 'react';
import './userButton.css';

const UserButton = () => {
    const baseUrl = import.meta.env.BASE_URL;
    
    const [open, setOpen] = useState(false);

    //TEMP
    const currentUser = true;
    return currentUser ? (    
        <div className="userButton">
            <img src={`${baseUrl}general/noAvatar.png`} alt="" />
            <img onClick={() => setOpen(prev => !prev)} src={`${baseUrl}general/arrow.svg`} alt="" className='arrow'/>
            {open && <div className="userOptions">
                <div className="userOption">Profile</div>
                <div className="userOption">Settings</div>
                <div className="userOption">Logout</div>
            </div>}
        </div>
    ) : (<a href='' className='loginLink' >Login / Sign up</a>);
}

export default UserButton;