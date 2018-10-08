import * as React from 'react';
import { connect } from "react-redux";
import { Button, Icon, Popup } from 'semantic-ui-react';
import NodeMenu from './NodeMenu';
import { Node } from '../../models/Node';
import NewNodeButton from './NewNodeButton';
import { Dispatch } from 'redux';
import * as NodesActions from '../../actions/NodesActions';

interface IToolbar {
    // nodeId: string;
    node: Node;
    toggleDone: (nodeId:string) => void;
    // CreateNewNodeWithParentIdClicked: () => void;
}

class Toolbar extends React.Component<IToolbar> {
    constructor(props: IToolbar) {
        super(props);
    }

    render() {
        const { node , toggleDone} = this.props;

        return (
            // <div style={{
            //     float: "right",
            //     // width: "15%" // need to extend it to max-possible
            //     display: "flex"
            // }}>
            <div style={{ display: "flex" }}>
                <Button
                    basic={true}
                    icon="check"
                    onClick={()=>toggleDone(node.Id)}
                />
                <NewNodeButton nodeId={node.Id} />
                <Popup
                    // flowing
                    hoverable={true}
                    trigger={
                        <Button basic={true} icon={true} >
                            <Icon name="ellipsis vertical" />
                        </Button>
                    }
                    on={['hover', 'click']}
                    style={{ padding: "0px", backgroundColor: "aqua" }}
                >
                    <NodeMenu node={node} />
                </Popup>
            </div>
            // </div>
        );
    }
}

// export default Toolbar;

const mapDispatchToProps = (dispatch: Dispatch, ownProps: IToolbar) => ({
    // CreateNewNodeWithParentIdClicked: () => dispatch(CreateNewNodeAsChild(v1(), ownProps.nodeId)),
    // CreateNewNodeWithParentIdClicked: () => dispatch(CreateNode(v1(), ownProps.nodeId)),
    toggleDone: (nodeId:string)=> dispatch(NodesActions.toglleDoneNodeBranch(nodeId)),
});

export default connect<any, any, any>( null, mapDispatchToProps)(Toolbar);
