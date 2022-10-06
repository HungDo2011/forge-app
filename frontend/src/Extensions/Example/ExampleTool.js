import { ToolInterface } from '@contecht/react-adsk-forge-viewer';

class ExampleTool extends ToolInterface {
    toolName = 'ExampleTool';

    activate() {
        console.log('Example Tool activate');
    }

    deactivate() {
        console.log('ET deactivate');
    }

    register() {
        console.log('ET register');
    }

    deregister() {
        console.log('ET deregister');
    }

    handleSingleClick(e) {
        const test = this.viewer.clientToWorld(e.canvasX, e.canvasY, true);
        console.info(test);
        return true;
    }
}

export default ExampleTool;
