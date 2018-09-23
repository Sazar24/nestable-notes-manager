import * as React from 'react';
// import { Grid, Menu} from 'semantic-ui-react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IGlobalReduxState } from '../../reducers';
import { Dispatch } from 'redux';
import { PassEditModeToId } from '../../actions/NodeSelecing';

interface INodeMenu {
    nodeId: string;
    // TODO: chyba jednak będę musiał przekazywać całą notatkę, nie tylko ID
    TurnOnEditMode: () => void;
}

class NodeMenu extends React.Component<INodeMenu> {
    constructor(props: INodeMenu) {
        super(props);
    }

    render(): any {
        const { TurnOnEditMode } = this.props;
        return (
            <div>
                <Menu
                    size="mini"
                    vertical={true}
                    compact={true}
                >
                    {/* <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} /> */}
                    <Menu.Item name="edit" onClick={TurnOnEditMode} />
                    {/* active={activeItem === 'messages'} onClick={this.handleItemClick} /> */}
                    <Menu.Item name="delete" />
                    {/* active={activeItem === 'friends'} onClick={this.handleItemClick} /> */}
                    <Menu.Item name="kill my children" />
                    <Menu.Item name="move me up" />
                    <Menu.Item name="cut" />
                    <Menu.Item name="paste" />
                    <Menu.Item name="enlight" />
                    <Menu.Item name="roll" />
                </Menu>
            </div>
        );
    }
}

// export default NodeMenu;
const mapStatetoProps = () => ({
    
})
const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeMenu) => ({
    TurnOnEditMode: () => dispatch(PassEditModeToId(ownProps.nodeId)),
    // TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    // DeleteNodeClick: () => dispatch(NodesActions.DeleteNode(ownProps.nodeId)),
    // DeleteNodeById: (id: string) => dispatch(NodesActions.DeleteNode(id)),
    // SaveNodeContent: (node: INode) => dispatch(NodesActions.ChangeNodeContent(node)),
    // MoveLevelUp: (node: Node) => dispatch(NodesActions.MoveNodeCloserToAncestor(node)),
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps,mapDispatchToProps)(NodeMenu);
export default ConnectedEditableNode;