/* eslint-disable no-undef */
import { ForgeViewer } from '@contecht/react-adsk-forge-viewer';
import { useSelector } from 'react-redux';

import { getForgeToken } from 'untils/request';
import { urnSelector } from 'redux/UrnLink/urnSelcetor';
import ExampleExtension from 'Extensions/Example/ExampleExtension';
import ExampleTool from 'Extensions/Example/ExampleTool';
import { bootScreenSelector } from 'redux/Refresh/refreshSelector';

let viewer;

function onDocumentLoadSuccess(doc) {
    let viewables = doc.getRoot().getDefaultGeometry();

    viewer.loadDocumentNode(doc, viewables).then((i) => {
        console.log('load document success');
    });
}

function onDocumentLoadFailure(viewerErrorCode, viewerErrorMsg) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode + '\n- errorMessage:' + viewerErrorMsg);
}

export function launchViewer(urn) {
    if (urn !== null) {
        const options = {
            env: 'AutodeskProduction',
            getAccessToken: getForgeToken,
        };

        Autodesk.Viewing.Initializer(options, () => {
            viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {
                extensions: ['Autodesk.DocumentBrowser'],
            });

            viewer.start();
            let documentId = 'urn:' + urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        });
    }
}

function ViewContainer() {
    const bootScreen = useSelector(bootScreenSelector);

    const urn = useSelector(urnSelector);

    const token = localStorage.getItem('token');

    return (
        <>
            {bootScreen ? (
                <img
                    src="https://aecom.solutions/wp-content/uploads/2020/12/blo.jpg"
                    alt="Boot Screen to change the world!"
                    style={{ width: '100%', height: '100%', opacity: '0.85' }}
                />
            ) : (
                <ForgeViewer
                    local={true}
                    token={token}
                    urn={urn}
                    headless={false}
                    initializerOptions={launchViewer(urn)}
                    onInit={() => {}}
                    onDocumentLoadSuccess={onDocumentLoadSuccess}
                    onDocumentLoadError={onDocumentLoadFailure}
                    extensions={[ExampleExtension]}
                    activeTool={ExampleTool}
                />
            )}
        </>
    );
}

export default ViewContainer;
