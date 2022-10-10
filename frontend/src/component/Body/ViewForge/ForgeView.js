/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getForgeToken } from 'untils/request';
import { urnSelector } from 'redux/UrnLink/urnSelcetor';
import { bootScreenSelector } from 'redux/Refresh/refreshSelector';

// Extensions
// import HandleSelectionExtension from 'Extensions/HandleSelectionExtension/HandleSelectionExtension';
// import ModelSummaryExtension from 'Extensions/ModelSummaryExtension/ModelSummaryExtension';
import IconMarkupExtension from 'Extensions/IconMarkupExtension/IconMarkupExtension';
import TurnTableExtension from 'Extensions/CameraRotation/CameraRotation';
// import DrawToolExtension from 'Extensions/DrawToolExtension/DrawToolExtension';
// import RegisterTransformTool from 'Extensions/TransformationExtension/TransformationExtension';

let viewer;

const extensions = ['CameraRotation'];

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
            //Register Extension
            //
            //======================= Extensions processed ============//
            //Transformation Extension
            //  RegisterTransformTool();

            //  //Model Summary Extension
            //  Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);

            //  //Handle Selection Extension
            //  Autodesk.Viewing.theExtensionManager.registerExtension(
            //      'HandleSelectionExtension',
            //      HandleSelectionExtension,
            //  );

            //Draw Tool Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('DrawToolExtension', DrawToolExtension);

            //========================================================//

            //Icon Markup Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('IconMarkupExtension', IconMarkupExtension);

            //Camera Rotation
            Autodesk.Viewing.theExtensionManager.registerExtension('CameraRotation', TurnTableExtension);

            viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {
                extensions: extensions,
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

    useEffect(() => {
        launchViewer(urn);
    }, [urn]);

    return (
        <>
            {bootScreen ? (
                <img
                    src="https://aecom.solutions/wp-content/uploads/2020/12/blo.jpg"
                    alt="Boot Screen to change the world!"
                    style={{ width: '100%', height: '100%', opacity: '0.85' }}
                />
            ) : (
                <div id="forgeViewer"></div>
            )}
        </>
    );
}

export default ViewContainer;
