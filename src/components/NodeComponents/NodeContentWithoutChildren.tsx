import * as React from 'react';
import { connect } from 'react-redux';
import { INode } from "../../models/Node";
import { List } from 'semantic-ui-react';
import { IState } from '../../reducers';
import ConnectedEditableNode from './NodeEditMode';

interface INodeMainContent {
    node: INode;
    editMode: boolean;
}

class NodeContentWithoutChildren extends React.Component<INodeMainContent>{
    public render() {
        const { node, editMode } = this.props;

        if (editMode === false) {
            return (
                <div style={{ width: "100%", paddingRight: "15px" }}>
                    <List.Header>
                        {node.header} <span style={{ float: "right" }}> [Id: {node.Id}] </span>
                    </List.Header>
                    <List.Description>
                        {node.description}
                        <span style={{ float: "right" }}> [parent:{" "} {node.parentID ? node.parentID : "(i dont have any parents)"}]</span>
                    </List.Description>
                    {/*TODO: Gdzieś tu jakiś click, żeby wchodziło  w edit mode  */}
                </div>
            )
        }
        else return <ConnectedEditableNode nodeId={node.Id} />
    }
}

// export default NodeContentWithoutChildren;
function AmIInEditMode(askingNodeId: string, IdOfEditableNode: string | null): boolean {

    if (askingNodeId === IdOfEditableNode) { return true }
    else {
        return false
    }
}

const mapStateToProps = (state: IState, ownProps: INodeMainContent) => ({
    editMode: AmIInEditMode(ownProps.node.Id, state.selectedNodes.IdOfEditableNode),
    // editMode: false,
})

const ConnectedNodeContentWithoutChildren = connect<any, any, any>(mapStateToProps)(NodeContentWithoutChildren);
export default ConnectedNodeContentWithoutChildren;