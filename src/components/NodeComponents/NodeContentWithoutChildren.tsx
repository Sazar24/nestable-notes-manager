import * as React from 'react';
import { connect } from 'react-redux';
import { INode } from "../../models/Node";
import { List } from 'semantic-ui-react';
import { IState } from '../../reducers';
import ConnectedEditableNode from './NodeEditMode';
import { Dispatch } from 'redux';
import { PassEditModeToId } from '../../actions/EditModeReducerActions';

interface INodeMainContent {
    node: INode;
    editMode: boolean;
    switchToEditMode: () => void;
}

class NodeContentWithoutChildren extends React.Component<INodeMainContent>{
    render() {
        const { node, editMode, switchToEditMode } = this.props;

        if (editMode) {
            return <ConnectedEditableNode nodeId={node.Id} />
        }
        else {
            return (
                <div
                    style={{ width: "100%", paddingRight: "15px" }}
                    onClick={() => switchToEditMode()}
                >
                    <List.Header >
                        {node.header}
                        <span style={{ float: "right" }}> [Id: {node.Id}] </span>
                    </List.Header>
                    <List.Description>
                        {node.description}
                        <span style={{ float: "right" }}> [parent:{" "} {node.parentID ? node.parentID : "(i dont have any parents)"}]</span>
                    </List.Description>
                </div>
            )
        }
    }
}

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

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeMainContent) => ({
    switchToEditMode: () => dispatch(PassEditModeToId(ownProps.node.Id))
})

const ConnectedNodeContentWithoutChildren = connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NodeContentWithoutChildren);
export default ConnectedNodeContentWithoutChildren;