/* eslint-disable no-undef */
import { getForgeToken } from 'untils/request';

// Extensions
// import MyExtension from 'Extensions/MyExtension/MyExtension';
import ExplodeExtension from 'Extensions/ExplodeExtension/ExplodeExtension';
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
    // 'MyExtension',
    // 'TurnTable',
    'ExplodeExtension',
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

function launchViewer(urn) {
    if (urn !== null) {
        const options = {
            env: 'AutodeskProduction',
            getAccessToken: getForgeToken,
        };

        Autodesk.Viewing.Initializer(options, () => {
            //==Register Extension==//

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

            // //Popout Extension
            Autodesk.Viewing.theExtensionManager.registerExtension('ExplodeExtension', ExplodeExtension);

            // My Extension
            // Autodesk.Viewing.theExtensionManager.registerExtension('MyExtension', MyExtension);

            //========================================================//

            viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById('forgeViewer'), {
                extensions: extensions,
            });

            viewer.setDisplayEdges(true);
            // viewer.loadExtension('Autodesk.BIM360.GestureDocumentNavigation');
            viewer.loadExtension('Autodesk.Viewing.Popout');

            viewer.loadExtension('Autodesk.MemoryLimited');
            viewer.loadExtension('Autodesk.Viewing.MemoryLimitedDebug');

            viewer.start();
            let documentId = 'urn:' + urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
        });
    } else if (urn === null) {
        extensions.map((item) => {
            Autodesk.Viewing.theExtensionManager.unregisterExtension(item);
            return true;
        });

        viewer.finish();
        viewer = null;
        Autodesk.Viewing.shutdown();
    }
}

export default launchViewer;
