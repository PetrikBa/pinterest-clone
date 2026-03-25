import { useState } from 'react';
import './userButton.css';
import Image from '../imageComponent/imageComponent';
import apiRequest from '../../utils/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../utils/authStore';

const UserButton = () => {    
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const { currentUser, removeCurrentUser } = useAuthStore();

    const closeMenu = () => setOpen(false);

    const handleLogout = async () => {
        try {
            await apiRequest.post('/users/auth/logout', {});
            closeMenu();
            removeCurrentUser();
            navigate('/auth');
        } catch (err) {
            console.log('Logout failed:', err);
        }
    }

    return currentUser ? (    
        <div className="userButton">
            <Image path={currentUser.img || "general/noAvatar.png"} alt="" />
            <div onClick={() => setOpen(prev => !prev)}>
                <Image 
                    path="general/arrow.svg" 
                    alt="" 
                    className='arrow'
                />
            </div>
            {open && <div className="userOptions">
                <Link to={`/${currentUser.userName}`} className="userOption" onClick={closeMenu}>Profile</Link>
                <div className="userOption" onClick={closeMenu}>Settings</div>
                <div className="userOption" onClick={handleLogout}>Logout</div>
            </div>}
        </div>
    ) : (<Link to='/auth' className='loginLink' >Login / Sign up</Link>);
}

export default UserButton;