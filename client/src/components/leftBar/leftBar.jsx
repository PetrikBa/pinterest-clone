import './leftBar.css';
import Image from '../imageComponent/imageComponent';
import { Link } from 'react-router-dom';

const LeftBar = () => {

    return (    
        <div className="leftBar">
            <div className="menuIcons">
                <Link to="/" className="menuIcon">
                    <Image path="general/logo.png" alt="" className='logo'/>
                </Link>
                <Link to="/" className="menuIcon">
                    <Image path="general/home.svg" alt="" />
                </Link>
                <Link to="/create" className="menuIcon">
                    <Image path="general/create.svg" alt="" />
                </Link>
                <Link to="/" className="menuIcon">
                    <Image path="general/updates.svg" alt="" />
                </Link>
                <Link to="/" className="menuIcon">
                    <Image path="general/messages.svg" alt="" />
                </Link>
            </div>
            <Link to="/" className="menuIcon settingsIcon">
                <Image path="general/settings.svg" alt="" />
            </Link>
        </div>
    );
}

export default LeftBar;