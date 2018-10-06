import * as React from 'react';
// import { Grid, Menu} from 'semantic-ui-react';
import { Menu, Button, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IGlobalReduxState } from '../../reducers';
import { Dispatch } from 'redux';
// import { PassEditModeToId } from '../../actions/NodeSelecing';
import * as NodesActions from '../../actions/NodesActions';
import * as NodeSelecing from '../../actions/NodeSelecing';
import { INode } from '../../models/Node';

interface INodeMenu {
    node: INode;
    TurnOnEditMode: () => void;
    TurnOffEditMode: () => void;    // TODO: Zrobić jeden przycisk 'On/Off Edit Mode'
    DeleteNode: () => void;
    MoveLevelUp: () => void;
    RememberNodeId: () => void;
    PasteNodeAsChildToThisNode: (movingNodeId: string) => void;
    cuttedIdInClipboard: string;
}

class NodeMenu extends React.Component<INodeMenu> {
    constructor(props: INodeMenu) {
        super(props);
    }

    render(): any {
        const { TurnOnEditMode, TurnOffEditMode, DeleteNode, MoveLevelUp, RememberNodeId, PasteNodeAsChildToThisNode, cuttedIdInClipboard } = this.props;
        return (
            <div>
                <Menu size="mini" vertical={true} compact={true} >
                    <Menu.Item name="edit" onClick={TurnOnEditMode} />
                    <Menu.Item name="exit edit mode" onClick={TurnOffEditMode} />
                    <Menu.Item name="delete" onClick={DeleteNode} />
                    <Menu.Item name="kill my children" />
                    <Menu.Item name="move me up" onClick={MoveLevelUp} />
                    <Menu.Item name="cut node" onClick={RememberNodeId} />
                    {/* <Popup
                        content={<div> Long live lorem ipsum! </div>}
                        trigger={ */}
                    <Menu.Item
                        name="Paste"
                        onClick={() => PasteNodeAsChildToThisNode(cuttedIdInClipboard)}
                    />
                    {/* /> */}
                    <Menu.Item name="enlight" />
                    <Menu.Item name="roll" />
                </Menu>
            </div>
        );
    }
}

// export default NodeMenu;
const mapStatetoProps = (state: IGlobalReduxState) => ({
    cuttedIdInClipboard: state.selectedNodes.IdOfCuttedNode
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeMenu) => ({
    TurnOnEditMode: () => dispatch(NodeSelecing.PassEditModeToId(ownProps.node.Id)),
    TurnOffEditMode: () => dispatch(NodeSelecing.PassEditModeToId(null)),
    DeleteNode: () => dispatch(NodesActions.DeleteNode(ownProps.node.Id)),
    // DeleteNodeById: (id: string) => dispatch(NodesActions.DeleteNode(id)),
    // SaveNodeContent: (node: INode) => dispatch(NodesActions.ChangeNodeContent(node)),
    MoveLevelUp: () => dispatch(NodesActions.MoveNodeCloserToAncestor(ownProps.node)),
    RememberNodeId: () => dispatch(NodeSelecing.SelectAndRememberNodeId(ownProps.node.Id)),
    PasteNodeAsChildToThisNode: (movingNodeId: string) => dispatch(NodesActions.PasteAsChild(movingNodeId, ownProps.node.Id)),
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NodeMenu);
export default ConnectedEditableNode;