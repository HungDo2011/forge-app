/* eslint-disable no-undef */

export default class TurnTableExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this.subToolbar = null;
        this.customize = this.customize.bind(this);
    }

    load() {
        this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.customize);

        console.log('TurnTableExtension is loaded!');
        return true;
    }

    unload() {
        this.viewer.removeEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.customize);
        console.log('TurnTableExtension is now unloaded!');
        return true;
    }

    customize() {
        var viewer = this.viewer;
        //Start coding here ...

        const turnTableToolbarButton = new Autodesk.Viewing.UI.Button('turnTableButton');
        turnTableToolbarButton.addClass('toolbarCameraRotation');
        turnTableToolbarButton.setToolTip('Start/Stop Camera rotation');

        // SubToolbar
        this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('CameraRotateToolbar');
        this.subToolbar.addControl(turnTableToolbarButton);
        viewer.toolbar.addControl(this.subToolbar);

        var started = false;

        var rotateCamera = () => {
            if (started) {
                requestAnimationFrame(rotateCamera);
            }

            var nav = viewer.navigation;
            var up = nav.getCameraUpVector();
            var axis = new THREE.Vector3(0, 0, 1);
            var speed = (10.0 * Math.PI) / 180;
            var matrix = new THREE.Matrix4().makeRotationAxis(axis, speed * 0.1);

            var pos = nav.getPosition();
            pos.applyMatrix4(matrix);
            up.applyMatrix4(matrix);
            nav.setView(pos, new THREE.Vector3(0, 0, 0));
            nav.setCameraUpVector(up);
            var viewState = viewer.getState();
            viewer.restoreState(viewState);
        };

        turnTableToolbarButton.onClick = function (e) {
            started = !started;
            if (started) rotateCamera();
        };
    }
}
