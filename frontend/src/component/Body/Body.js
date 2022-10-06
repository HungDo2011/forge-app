import TreeManager from './TreeManager/TreeManager';
import ViewContainer from './ViewForge/ForgeView';
// import ViewForge from './ViewForge/ViewForge';

function Body() {
    return (
        <div className="container-fluid fill container-body">
            <div className="row fill">
                <div className="col-sm-3 fill ">
                    <TreeManager />
                </div>

                <div className="col-sm-9 fill">
                    <ViewContainer />
                </div>
            </div>
        </div>
    );
}

export default Body;
