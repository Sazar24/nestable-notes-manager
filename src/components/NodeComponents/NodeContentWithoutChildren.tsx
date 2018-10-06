import * as React from 'react';
import { connect } from 'react-redux';
import { INode } from "../../models/Node";
import { List, Reveal, Image, Button, Icon } from 'semantic-ui-react';
import ConnectedEditableNode from './NodeEditMode';
import { Dispatch } from 'redux';
import { PassEditModeToId } from '../../actions/NodeSelecing';
import { IGlobalReduxState } from '../../reducers/index';

interface INodeMainContent {
    node: INode;
    editMode: boolean;
    switchToEditMode: () => void;
}

class NodeContentWithoutChildrenUnconnected extends React.Component<INodeMainContent>{
    render() {
        const { node, editMode, switchToEditMode } = this.props;
        if (editMode)
            return <ConnectedEditableNode nodeId={node.Id} />
        else {
            return (
                <div style={{
                    width: "100%", paddingRight: "15px",
                    whiteSpace: "pre-wrap", wordWrap: "break-word", wordBreak: "keep-all",
                    textAlign: "justify", textJustify: "inter-word", textOverflow: "clip"
                }}
                    onDoubleClick={() => switchToEditMode()}
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

const mapStateToProps = (state: IGlobalReduxState, ownProps: INodeMainContent) => ({
    editMode: (ownProps.node.Id === state.selectedNodes.IdOfEditableNode) ? true : false
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeMainContent) => ({
    switchToEditMode: () => dispatch(PassEditModeToId(ownProps.node.Id))
})

const NodeContentWithoutChildren = connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NodeContentWithoutChildrenUnconnected);
export default NodeContentWithoutChildren;