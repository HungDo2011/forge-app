import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { Button, CircularProgress } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { authRequest } from 'untils/request';
import { testEmail, testPassword } from 'Validator';
import { Link } from 'react-router-dom';
import { isFetchingSelector } from 'redux/Auth/authSelector';

const inputStyle = { width: '100%', marginTop: 20 };

const errStyle = {
    fontSize: 10,
    margin: '4px 0 0 2px',
    float: 'left',
    color: '#f15e5e',
};

function InputForm({ login }) {
    const [valueName, setValueName] = useState('');
    const [errValueName, setErrValueName] = useState(false);
    const [valueEmail, setValueEmail] = useState('');
    const [errValueEmail, setErrValueEmail] = useState(false);
    const [valuePassword, setValuePassword] = useState('');
    const [errValuePassword, setErrValuePassword] = useState(false);
    const [valueRePassword, setValueRePassword] = useState('');
    const [errValueRePassword, setErrValueRePassword] = useState(false);
    const [checked, setChecked] = useState(false);

    const isFetching = useSelector(isFetchingSelector);

    const dispatch = useDispatch();

    const validatorName = () => {
        if (valueName.length >= 20) {
            setErrValueName(true);
        } else {
            setErrValueName(false);
        }
    };

    const validatorEmail = () => {
        if (!testEmail(valueEmail)) {
            setErrValueEmail(true);
        } else {
            setErrValueEmail(false);
        }
    };

    const validatorPassword = () => {
        if (!testPassword(valuePassword)) {
            setErrValuePassword(true);
        } else {
            setErrValuePassword(false);
        }
    };

    const handleSubmit = () => {
        switch (login) {
            case true:
                if (!errValueEmail && !errValuePassword && valueEmail !== '' && valuePassword !== '') {
                    const data = {
                        email: valueEmail,
                        password: valuePassword,
                    };
                    authRequest(data, 'login', dispatch);
                }
                break;
            case false:
                if (
                    checked &&
                    valueEmail !== '' &&
                    valuePassword !== '' &&
                    valueName !== '' &&
                    valueRePassword !== '' &&
                    !errValueName &&
                    !errValueEmail &&
                    !errValuePassword &&
                    !errValueRePassword
                ) {
                    const data = {
                        name: valueName,
                        email: valueEmail,
                        password: valuePassword,
                    };
                    authRequest(data, 'register', dispatch);
                }
                break;
            default:
                return;
        }
    };

    return (
        <>
            <form className="form-data">
                {!login && (
                    <>
                        <TextField
                            id="outlined-basic"
                            onChange={(e) => setValueName(e.target.value)}
                            onBlur={validatorName}
                            value={valueName}
                            label="Your Name"
                            variant="outlined"
                            style={inputStyle}
                            size="small"
                        />
                        {errValueName && <p style={errStyle}>Your account name is too longgg!</p>}
                    </>
                )}

                <TextField
                    id="outlined-basic"
                    onChange={(e) => setValueEmail(e.target.value)}
                    onBlur={validatorEmail}
                    value={valueEmail}
                    label="Email"
                    variant="outlined"
                    style={inputStyle}
                    size="small"
                />
                {errValueEmail && <p style={errStyle}>Email is incozage!</p>}

                <TextField
                    id="outlined-basic"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && login) {
                            handleSubmit();
                        }
                    }}
                    onChange={(e) => setValuePassword(e.target.value)}
                    onBlur={validatorPassword}
                    value={valuePassword}
                    type="password"
                    label="Password"
                    variant="outlined"
                    style={inputStyle}
                    size="small"
                />
                {errValuePassword && <p style={errStyle}>Password is incorrect!</p>}

                {!login && (
                    <>
                        <TextField
                            id="outlined-basic"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !login) {
                                    handleSubmit();
                                }
                            }}
                            onChange={(e) => setValueRePassword(e.target.value)}
                            onBlur={() => setErrValueRePassword(!(valuePassword === valueRePassword))}
                            value={valueRePassword}
                            type="password"
                            label="Comfirm Password"
                            variant="outlined"
                            style={inputStyle}
                            size="small"
                        />
                        {errValueRePassword && <p style={errStyle}>Your password and confirmation password must match</p>}

                        <div style={{ marginTop: 10 }}>
                            <span style={{ fontSize: 12, textTransform: 'none' }}>
                                <Checkbox
                                    size="small"
                                    sx={{
                                        color: '#ff6763',
                                        '&.Mui-checked': {
                                            color: '#0696d7',
                                        },
                                    }}
                                    checked={checked}
                                    onClick={() => setChecked(!checked)}
                                />
                                I agree to the{' '}
                                <a href="https://www.autodesk.com/company/terms-of-use/en/general-terms">Autodesk Terms of Use</a> and the{' '}
                                <a href="https://www.autodesk.com/company/legal-notices-trademarks/privacy-statement">Privacy Statement</a>.
                            </span>
                        </div>
                    </>
                )}

                <Button
                    className="btn-submit"
                    sx={{
                        width: '100%',
                        marginTop: '20px',
                        padding: '10px 16px',
                        backgroundColor: '#0696d7',
                        borderColor: '#2481af',
                        color: '#fff',
                    }}
                    onClick={handleSubmit}
                >
                    {isFetching ? <CircularProgress size="20px" sx={{ color: '#efeff0' }} /> : login ? ' Sign In' : 'Create accout'}
                </Button>
            </form>
            <p
                style={{
                    marginTop: '27px',
                    paddingRight: '15px',
                    paddingLeft: '15px',
                    textAlign: 'center',
                    fontSize: 12,
                }}
            >
                {login ? 'NEW TO AUTODESK?' : 'ALREADY HAVE AN ACCOUNT?'}

                {login ? (
                    <Link
                        onClick={() => {
                            setValueEmail('');
                            setValuePassword('');
                        }}
                        to="/register"
                        style={{
                            color: '#32bbac',
                            cursor: 'pointer',
                        }}
                    >
                        {' '}
                        CREATE ACCOUNT
                    </Link>
                ) : (
                    <Link
                        onClick={() => {
                            setValueName('');
                            setValueEmail('');
                            setValuePassword('');
                            setValueRePassword('');
                        }}
                        to="/"
                        style={{
                            color: '#32bbac',
                            cursor: 'pointer',
                        }}
                    >
                        {' '}
                        SIGN IN
                    </Link>
                )}
            </p>
        </>
    );
}

export default InputForm;
