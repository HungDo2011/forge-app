import InputForm from 'component/Form/BoxLogin/InputForm/InputForm';

function BoxLogin({ login }) {
    return (
        <div className="box-login">
            <div className="header-box">
                <h2 className="header-title">{login ? 'sign in' : 'create account'}</h2>

                <img className="header-img" src="//developer.static.autodesk.com/images/logo_forge-2-line.png" alt="icon" />
            </div>
            <InputForm login={login} />
        </div>
    );
}

export default BoxLogin;
