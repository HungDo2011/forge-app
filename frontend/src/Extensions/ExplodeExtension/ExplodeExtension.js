/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */

export default class ExplodeExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._button = null;
        this._group = null;
    }

    load() {
        console.log('Explode Extension loaded!');
        return true;
    }
    unload() {
        console.log('Explode Extension unloaded');
        return true;
    }

    activate() {}

    deactivate() {}

    onToolbarCreated(toolbar) {
        this._button = new Autodesk.Viewing.UI.Button('Explode button');
        this._button.addClass('explodeButton');
        this._button.setToolTip('Explode Extension');

        this._group = new Autodesk.Viewing.UI.ControlGroup('Explode group');
        this._group.addControl(this._button);
        this.viewer.toolbar.addControl(this._group);
    }

    isActive() {}

    getScale() {}

    setScale() {}

    setStrategy() {}

    getStrategy() {}

    setUIEnabled() {}
}
