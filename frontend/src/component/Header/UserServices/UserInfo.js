/* eslint-disable no-restricted-globals */
import { useState } from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip, Zoom } from '@mui/material';

import PopoverUser from './Popover/PopoverUser';

function UserInfo() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const deleteAllCookies = () => {
        const cookies = document.cookie.split(';');

        for (const cookie of cookies) {
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    };

    const handleLogout = () => {
        deleteAllCookies();
        localStorage.clear();
        location.reload();
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                width: 'auto',
                cursor: 'pointer',
            }}
        >
            <span
                style={{
                    padding: 12,
                }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                <img
                    style={{
                        width: 25,
                        backgroundColor: '#000',
                        borderRadius: '50%',
                        border: '1px solid #333',
                    }}
                    alt="avatar"
                    src="https://blogs.autodesk.com/presse-center-deutschland/wp-content/uploads/sites/93/2016/08/Autodesk-logo-e1468255451527.png"
                />
            </span>
            <PopoverUser id={id} open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)} />

            <Tooltip TransitionComponent={Zoom} title="Logout" placement="bottom" arrow>
                <span className="logout-btn" onClick={handleLogout}>
                    <LogoutIcon />
                </span>
            </Tooltip>
        </div>
    );
}

export default UserInfo;
