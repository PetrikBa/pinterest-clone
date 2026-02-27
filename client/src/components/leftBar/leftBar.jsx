import './LeftBar.css';

const LeftBar = () => {
    const baseUrl = import.meta.env.BASE_URL;

    return (    
        <div className="leftBar">
            <div className="menuIcons">
                <a href={baseUrl} className="menuIcon">
                    <img src={`${baseUrl}general/logo.png`} alt="" className='logo'/>
                </a>
                <a href={baseUrl} className="menuIcon">
                    <img src={`${baseUrl}general/home.svg`} alt="" />
                </a>
                <a href={baseUrl} className="menuIcon">
                    <img src={`${baseUrl}general/create.svg`} alt="" />
                </a>
                <a href={baseUrl} className="menuIcon">
                    <img src={`${baseUrl}general/updates.svg`} alt="" />
                </a>
                <a href={baseUrl} className="menuIcon">
                    <img src={`${baseUrl}general/messages.svg`} alt="" />
                </a>
            </div>
            <a href={baseUrl}>
                <img src={`${baseUrl}general/settings.svg`} alt="" />
            </a>
        </div>
    );
}

export default LeftBar;