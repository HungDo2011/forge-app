/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import launchViewer from './launchViewer';
import { setUrnLink } from 'redux/UrnLink/urnSlice';
import { urnSelector } from 'redux/UrnLink/urnSelcetor';
import { changeBootScreen } from 'redux/Refresh/refreshSlice';
import { bootScreenSelector } from 'redux/Refresh/refreshSelector';

function ViewContainer() {
    const dispatch = useDispatch();

    const bootScreen = useSelector(bootScreenSelector);

    const urn = useSelector(urnSelector);

    const handleResetViewer = () => {
        dispatch(setUrnLink(null));
        dispatch(changeBootScreen(true));
    };

    useEffect(() => {
        if (urn !== null) {
            launchViewer(urn);
        }
    }, [urn]);

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
                        Reset Forge Viewer
                    </button>
                </>
            )}
        </>
    );
}

export default ViewContainer;
