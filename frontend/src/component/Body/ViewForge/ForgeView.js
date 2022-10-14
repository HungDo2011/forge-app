/* eslint-disable no-undef */
import { useSelector, useDispatch } from 'react-redux';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

import { setUrnLink } from 'redux/UrnLink/urnSlice';
import { changeBootScreen } from 'redux/Refresh/refreshSlice';
import { bootScreenSelector } from 'redux/Refresh/refreshSelector';

function ViewContainer() {
    const dispatch = useDispatch();

    const bootScreen = useSelector(bootScreenSelector);

    const handleResetViewer = () => {
        dispatch(setUrnLink(null));
        dispatch(changeBootScreen(true));
    };

    return (
        <>
            {bootScreen ? (
                <img
                    src="https://vietbimcoder.com/wp-content/uploads/2019/07/0.jpg"
                    alt="Boot Screen to change the world!"
                    style={{ width: '80%', height: '60%', opacity: '0.85' }}
                />
            ) : (
                <>
                    <div id="forgeViewer"></div>
                    <button onClick={handleResetViewer} className="btn-reset">
                        <PowerSettingsNewIcon /> Shutdown Forge Viewer
                    </button>
                </>
            )}
        </>
    );
}

export default ViewContainer;
