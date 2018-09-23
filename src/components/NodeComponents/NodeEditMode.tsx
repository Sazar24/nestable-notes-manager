import * as React from 'react';
import { connect } from "react-redux";
import { INode, Node } from '../../models/Node';
import { Input, Container, TextArea, Button, InputOnChangeData } from 'semantic-ui-react';
import { IGlobalReduxState } from '../../reducers/index';
import { PassEditModeToId } from '../../actions/NodeSelecing';
import { Dispatch } from 'redux';
// import { DeleteNode, ChangeNodeContent } from '../../actions/NodesActions';
import * as NodesActions from '../../actions/NodesActions';

import NodesManager from '../../services/NodesManager';

interface INodeEditModeProps {
    nodeId: string;
    node: INode;
    allDescendatsIds: string[];
    TurnOffEditMode: () => void;
    DeleteNodeClick: () => void;
    DeleteNodeById: (id: string) => void;
    SaveNodeContent: (node: INode) => void;
    DeleteAllChildren: (nodeId: string) => void;
    MoveLevelUp: (node: Node) => void;
};

interface INodeEditState {
    node: INode,
};

class NodeEditMode extends React.Component<INodeEditModeProps, INodeEditState>{
    state = {
        node: this.props.node
    };

    handleHeaderChange = (e: any) => {
        const newNode = Object.assign({}, this.state.node);
        newNode.header = e.target.value;
        this.setState({
            node: newNode
        })
    }

    handleDescriptionChange = (e: any) => {
        const newNode = Object.assign({}, this.state.node);
        newNode.description = e.target.value;
        this.setState({
            node: newNode
        })
    }

    deleteAllChildren() {   // test me!
        this.props.allDescendatsIds.map(
            (id: string) => {
                this.props.DeleteNodeById(id);
            }
        )
    }

    render() {
        const { node, TurnOffEditMode, DeleteNodeClick, SaveNodeContent, DeleteAllChildren, MoveLevelUp } = this.props;

        return (
            <div style={{
                width: "100%",
                marginTop: "3px",
                marginBottom: "3px"
            }} >
                <Input
                    style={{ width: "100%" }}
                    defaultValue={this.state.node.header}
                    onChange={this.handleHeaderChange}
                />
                <TextArea
                    defaultValue={node.description}
                    style={{ minWidth: "100%" }}
                    autoHeight={true}
                    onChange={this.handleDescriptionChange}
                />
                <Button onClick={() => SaveNodeContent(this.state.node)}> save node </Button>
                <Button onClick={TurnOffEditMode}> exit edit mode</Button>
                <Button onClick={DeleteNodeClick} > delete node</Button>
                <Button onClick={() => this.deleteAllChildren()}>delete sub-nodes</Button>
                <Button onClick={() => MoveLevelUp(node)}>move level up</Button>


            </div>
        )
    }
}

const mapStatetoProps = (state: IGlobalReduxState, ownProps: INodeEditModeProps) => ({
    node: new NodesManager().findNode(ownProps.nodeId, state.nodes),
    allDescendatsIds: new NodesManager().findAllDescendantsIds(ownProps.nodeId, state.nodes),
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeEditModeProps) => ({
    TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    DeleteNodeClick: () => dispatch(NodesActions.DeleteNode(ownProps.nodeId)),
    DeleteNodeById: (id: string) => dispatch(NodesActions.DeleteNode(id)),
    SaveNodeContent: (node: INode) => dispatch(NodesActions.ChangeNodeContent(node)),
    MoveLevelUp: (node: Node) => dispatch(NodesActions.MoveNodeCloserToAncestor(node)),
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NodeEditMode);
export default ConnectedEditableNode;