/* eslint-disable no-undef */
export default class MyExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._button = null;
        this._group = null;
        this.createUI = this.createUI.bind(this);
        this.activateExtension = false;
    }

    load() {
        this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.createUI);
        console.log('loaded MyExtension');
        return true;
    }

    unload() {
        this.viewer.removeEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.createUI);
        console.log('unloaded MyExtension');
        return true;
    }

    createUI() {
        // const viewer = this.viewer;
        const _self = this;

        this._button = new Autodesk.Viewing.UI.Button('MyExtensionButton');
        this._button.addClass('MyExtension');
        this._button.setToolTip('Do Something');

        //Sub Toolbar
        this._group = new Autodesk.Viewing.UI.ControlGroup('MyExtensionToolbar');
        this._group.addClass('MyExtensionToolbar');
        this._group.addControl(this._button);
        this.viewer.toolbar.addControl(this._group);

        this._button.onClick = function (e) {
            _self.activateExtension = !_self.activateExtension;
            if (_self.activateExtension) {
                _self._button.addClass('active');
                _self.viewer.isolate();
            } else {
                _self._button.removeClass('active');
                // _self.viewer.deactivateExtension();
            }
        };

        //
    }
}
