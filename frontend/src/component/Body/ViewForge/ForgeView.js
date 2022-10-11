/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getForgeToken } from 'untils/request';
import { urnSelector } from 'redux/UrnLink/urnSelcetor';
import { bootScreenSelector } from 'redux/Refresh/refreshSelector';

// Extensions
// import TurnTableExtension from 'Extensions/CameraRotation/CameraRotation';
// import MarkUp3DExtension from 'Extensions/MarkUp3DExtension/MarkUp3DExtension';
// import DrawToolExtension from 'Extensions/DrawToolExtension/DrawToolExtension';
// import IconMarkupExtension from 'Extensions/IconMarkupExtension/IconMarkupExtension';
// import NestedViewerExtension from 'Extensions/NestedViewerExtension/NestedViewerExtension';
// import ModelSummaryExtension from 'Extensions/ModelSummaryExtension/ModelSummaryExtension';
// import RegisterTransformTool from 'Extensions/TransformationExtension/TransformationExtension';
// import HandleSelectionExtension from 'Extensions/HandleSelectionExtension/HandleSelectionExtension';

let viewer;

const extensions = [
    // 'TurnTable',
    // 'MarkUp3DExtension',
    // 'DrawToolExtension',
    // 'IconMarkupExtension',
    // 'NestedViewerExtension',
    // 'ModelSummaryExtension',
    // 'TransformationExtension',
    // 'HandleSelectionExtension',
];

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
            // //Camera Rotation
            // Autodesk.Viewing.theExtensionManager.registerExtension('TurnTable', TurnTableExtension);

            // Mark Up 3D Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('MarkUp3DExtension', MarkUp3DExtension);

            // //Draw Tool Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('DrawToolExtension', DrawToolExtension);

            // //Icon Markup Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('IconMarkupExtension', IconMarkupExtension);

            // //NestedViewerExtension
            // Autodesk.Viewing.theExtensionManager.registerExtension('NestedViewerExtension', NestedViewerExtension);

            // //Model Summary Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('ModelSummaryExtension', ModelSummaryExtension);

            //Transformation Extension
            // RegisterTransformTool();

            // //Handle Selection Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension(
            //     'HandleSelectionExtension',
            //     HandleSelectionExtension,
            // );

            //========================================================//

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
