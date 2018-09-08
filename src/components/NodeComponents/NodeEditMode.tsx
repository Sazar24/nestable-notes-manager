import * as React from 'react';
import { connect } from "react-redux";
import { INode, SingleNode } from '../../models/Node';
import { Input, Container, TextArea, Button, InputOnChangeData } from 'semantic-ui-react';
import { IGlobalReduxState } from '../../reducers/index';
import { PassEditModeToId } from '../../actions/NodeSelecing';
import { Dispatch } from 'redux';
import { DeleteNodeWithId, ChangeNodeContent } from '../../actions/TaskListActions';

interface INodeEditModeProps {
    nodeId: string;
    node: INode;
    TurnOffEditMode: () => void;
    DeleteNode: () => void;
    SaveNodeContent: (node: INode) => void;  //
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

    render() {
        const { node, TurnOffEditMode, DeleteNode, SaveNodeContent } = this.props;

        return (
            <div style={{
                // border: "1px solid Aqua",
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
                <Button onClick={DeleteNode} > delete node</Button>
                <Button >delete sub-nodes</Button>
                <Button >toggle done</Button>

            </div>
        )
    }
}


const mapStatetoProps = (state: IGlobalReduxState, ownProps: INodeEditModeProps) => ({
    node: state.nodes[ownProps.nodeId],
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeEditModeProps) => ({
    TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    DeleteNode: () => dispatch(DeleteNodeWithId(ownProps.nodeId)),
    SaveNodeContent: (node: INode) => dispatch(ChangeNodeContent(node))
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NodeEditMode);
export default ConnectedEditableNode;