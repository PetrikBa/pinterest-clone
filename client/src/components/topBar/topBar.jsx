import UserButton from '../userButton/userButton';
import './topBar.css';
import Image from '../imageComponent/imageComponent';

const TopBar = () => {
    return (    
        <div className="topBar">
            <div className="search">
                <Image path="general/search.svg" alt="" />
                <input type="text" placeholder="Search" />
            </div>
            {/* USER */}
            <UserButton />
        </div>
        
    );
}

export default TopBar;