import * as React from 'react';
import { connect } from "react-redux";
import { INode } from '../../models/Node';
import { Input, Container, TextArea, Button } from 'semantic-ui-react';
import { IState } from '../../reducers';
import { PassEditModeToId } from '../../actions/EditModeReducerActions';
import { Dispatch } from 'redux';
import { DeleteNodeWithId } from '../../actions/TaskListActions';

// a może onClick (nowaNotka) twórz nową notkę z ID, nie usuwaj jej, tylko pusty nagłówek i description. Nie usuwać gdy click outside; 
// Plusem będzie możliwość utworzenia kilku pustych notatek, a header_onclick będzie edycja headera.
interface INodeEditMode {
    // node?: INode;
    nodeId: string;
    node: INode;
    TurnOffEditMode: () => void;
    DeleteNode: () => void;
}

class NodeEditMode extends React.Component<INodeEditMode>{
    public render() {
        const { node, TurnOffEditMode, DeleteNode } = this.props;

        return (
            <div style={{
                // border: "1px solid Aqua",
                // float: "left",
                // minWidth: "90%"
                width: "100%",
                marginTop: "3px"
            }} >
                <Input placeholder={node.header} />
                <TextArea
                    defaultValue={node.description}
                    style={{ minWidth: "100%" }}
                    autoHeight={true}
                />
                <Button> save node </Button>
                <Button onClick={TurnOffEditMode}> exit without saving </Button>
                <Button onClick={DeleteNode} > delete node</Button>

            </div>
        )
    }
}

// export default NodeEditMode;

const mapStatetoProps = (state: IState, ownProps: INodeEditMode) => ({
    node: state.nodes[ownProps.nodeId],
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeEditMode) => ({
    // switchToEditMode: () => dispatch(PassEditModeToId(ownProps.node.Id))
    TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    DeleteNode: () => dispatch(DeleteNodeWithId(ownProps.nodeId))
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NodeEditMode);
export default ConnectedEditableNode;