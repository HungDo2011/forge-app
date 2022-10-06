import UserInfo from './UserServices/UserInfo';

function Header() {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <div className="nav navbar-nav left">
                    <a href="http://forge.autodesk.com" target="_blank" rel="noreferrer">
                        <img
                            alt="Autodesk Forge"
                            src="//developer.static.autodesk.com/images/logo_forge-2-line.png"
                            height="28"
                            width="140"
                        />
                    </a>
                </div>
                <UserInfo />
            </div>
        </nav>
    );
}

export default Header;
