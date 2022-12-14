/* eslint-disable no-undef */

const optionsStyle = {
    icons: [
        { dbId: 9256, label: '30&#176;C', css: 'fas fa-thermometer-full' },
        { dbId: 920, label: '35&#176;C', css: 'fas fa-thermometer-full' },
        { dbId: 1626, label: '45&#176;C', css: 'fas fa-thermometer-empty' },
    ],
    button: {
        icon: 'fa-thermometer-half',
        tooltip: 'Show Temperature',
    },
};

export default class IconMarkupExtension extends Autodesk.Viewing.Extension {
    constructor(viewer, options) {
        super(viewer, options);
        this._group = null;
        this._button = null;

        this._icons = optionsStyle.icons || [];
    }

    load() {
        if (Autodesk.Viewing.InstanceTree) {
            this.customize();
        } else {
            this.viewer.addEventListener(Autodesk.Viewing.OBJECT_TREE_CREATED_EVENT, this.customize());
        }
        return true;
    }

    unload() {
        // Clean our UI elements if we added any
        if (this._group) {
            this._group.removeControl(this._button);
            if (this._group.getNumberOfControls() === 0) {
                this.viewer.toolbar.removeControl(this._group);
            }
        }
        document.querySelector('#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer label.markup').remove();
        return true;
    }

    activate() {
        console.log('active');
        return true;
    }

    deactivate() {
        console.log('deactive');
        return true;
    }

    customize() {
        const updateIconsCallback = () => {
            if (this._enabled) {
                this.updateIcons();
            }
        };
        this.viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.ISOLATE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.HIDE_EVENT, updateIconsCallback);
        this.viewer.addEventListener(Autodesk.Viewing.SHOW_EVENT, updateIconsCallback);
    }

    onToolbarCreated() {
        // Create a new toolbar group if it doesn't exist
        this._group = this.viewer.toolbar.getControl('customExtensions');
        if (!this._group) {
            this._group = new Autodesk.Viewing.UI.ControlGroup('customExtensions');
            this.viewer.toolbar.addControl(this._group);
        }

        // Add a new button to the toolbar group
        this._button = new Autodesk.Viewing.UI.Button('IconExtension');
        this._button.onClick = (ev) => {
            this._enabled = !this._enabled;
            this.showIcons(this._enabled);
            this._button.setState(this._enabled ? 0 : 1);
        };
        this._button.setToolTip(optionsStyle.button.tooltip);
        this._button.icon.classList.add('fas', optionsStyle.button.icon);
        this._group.addControl(this._button);
    }

    showIcons(show) {
        const viewer = document.getElementById('#' + this.viewer.clientContainer.id + ' adsk-viewing-viewer');

        // remove previous...
        document.querySelector('#' + this.viewer.clientContainer.id + ' adsk-viewing-viewer label.markup').remove();
        if (!show) return;

        // do we have anything to show?
        if (this._icons === undefined || this.icons === null) return;

        // do we have access to the instance tree?
        const tree = this.viewer.model.getInstanceTree();
        if (tree === undefined) {
            console.log('Loading tree...');
            return;
        }

        const onClick = (e) => {
            this.viewer.select(document.querySelector(e.currentTarget).data('id'));
            this.viewer.utilities.fitToView();
        };

        this._frags = {};
        for (let i = 0; i < this._icons.length; i++) {
            // we need to collect all the fragIds for a given dbId
            const icon = this._icons[i];
            this._frags['dbId' + icon.dbId] = [];

            // create the label for the dbId
            // const label = $(`
            // <label class="markup update" data-id="${icon.dbId}">
            //     <span class="${icon.css}"> ${icon.label || ''}</span>
            // </label>
            // `);

            const label = React.createElement('label');

            label.innerText = `<span class="${icon.css}"> ${icon.label || ''}</span>`;
            label.className = 'markup update';
            label.dataId = `${icon.dbId}`;

            label.css('display', this.viewer.isNodeVisible(icon.dbId) ? 'block' : 'none');
            label.on('click', this.options.onClick || onClick);
            viewer.append(label);

            // now collect the fragIds
            const getChildren = (topParentId, dbId) => {
                if (tree.getChildCount(dbId) === 0) getFrags(topParentId, dbId); // get frags for this leaf child
                tree.enumNodeChildren(dbId, (childId) => {
                    getChildren(topParentId, childId);
                });
            };
            const getFrags = (topParentId, dbId) => {
                tree.enumNodeFragments(dbId, (fragId) => {
                    this._frags['dbId' + topParentId].push(fragId);
                    this.updateIcons(); // re-position for each fragId found
                });
            };
            getChildren(icon.dbId, icon.dbId);
        }
    }

    getModifiedWorldBoundingBox(dbId) {
        var fragList = this.viewer.model.getFragmentList();
        const nodebBox = new THREE.Box3();

        // for each fragId on the list, get the bounding box
        for (const fragId of this._frags['dbId' + dbId]) {
            const fragbBox = new THREE.Box3();
            fragList.getWorldBounds(fragId, fragbBox);
            nodebBox.union(fragbBox); // create a unifed bounding box
        }

        return nodebBox;
    }

    updateIcons() {
        for (const _label of document.querySelector(
            '#' + this.viewer.clientContainer.id + ' div.adsk-viewing-viewer .update',
        )) {
            const label = document.querySelectorAll(_label);
            const id = label.data('id');

            // get the center of the dbId (based on its fragIds bounding boxes)
            const pos = this.viewer.worldToClient(this.getModifiedWorldBoundingBox(id).center());

            // position the label center to it
            label.css('left', Math.floor(pos.x - label[0].offsetWidth / 2) + 'px');
            label.css('top', Math.floor(pos.y - label[0].offsetHeight / 2) + 'px');
            label.css('display', this.viewer.isNodeVisible(id) ? 'block' : 'none');
        }
    }
}
