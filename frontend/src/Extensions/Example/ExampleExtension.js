/* eslint-disable no-undef */
import { ForgeExtension } from '@contecht/react-adsk-forge-viewer';

export default class ExampleExtension extends ForgeExtension {
    extensionName = 'Example';

    load() {
        const red = new THREE.Color(1, 0, 0);
        this.viewer.setSelectionColor(red, Autodesk.Viewing.SelectionType.MIXED);
        return true;
    }

    unload() {
        return true;
    }

    activate() {
        console.log('EE active');
    }

    deactivate() {
        console.log('EE deactive');
    }
}
