import * as React from 'react';
import { connect } from 'react-redux';
import { INode } from "../../models/Node";
import { List } from 'semantic-ui-react';
import ConnectedEditableNode from './NodeEditMode';
import { Dispatch } from 'redux';
import { PassEditModeToId } from '../../actions/NodeSelecing';
import {IGlobalReduxState} from '../../reducers/index';

interface INodeMainContent {
    node: INode;
    editMode: boolean;
    switchToEditMode: () => void;
}

class NodeContentWithoutChildren extends React.Component<INodeMainContent>{

    // handleClick() {
    //     // this.bgcolor = "red";
    //     this.setState({
    //         bgcolor: "red"
    //     });
    //     console.log("click in NodeWithChildren:", this.props.node);
    // }

    render() {
        const { node, editMode, switchToEditMode } = this.props;
        if (editMode) {
            return <ConnectedEditableNode nodeId={node.Id} />
        }
        else {
            return (
                <div style={{
                    width: "100%",
                    paddingRight: "15px",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    wordBreak: "keep-all",
                    textAlign: "justify",
                    textJustify: "inter-word",
                    textOverflow: "clip"
                }}
                    onClick={() => switchToEditMode()}
                >
                    <List.Header >
                        {node.header}
                    </List.Header>
                    <List.Description>
                        {node.description}
                    </List.Description>
                </div>
            )
        }
    }
}

function AmIInEditMode(askingNodeId: string, IdOfEditableNode: string | null): boolean {
    if (askingNodeId === IdOfEditableNode) return true
    else return false
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: INodeMainContent) => ({
    editMode: AmIInEditMode(ownProps.node.Id, state.selectedNodes.IdOfEditableNode),
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeMainContent) => ({
    switchToEditMode: () => dispatch(PassEditModeToId(ownProps.node.Id))
})

const ConnectedNodeContentWithoutChildren = connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NodeContentWithoutChildren);
export default ConnectedNodeContentWithoutChildren;