import * as React from 'react';
import { connect } from "react-redux";
import { INode } from '../../models/Node';
import { Input, Container, TextArea, Button, InputOnChangeData } from 'semantic-ui-react';
import { IState } from '../../reducers';
import { PassEditModeToId } from '../../actions/EditModeReducerActions';
import { Dispatch } from 'redux';
import { DeleteNodeWithId } from '../../actions/TaskListActions';

// a może onClick (nowaNotka) twórz nową notkę z ID, nie usuwaj jej, tylko pusty nagłówek i description. Nie usuwać gdy click outside; 
// Plusem będzie możliwość utworzenia kilku pustych notatek, a header_onclick będzie edycja headera.
interface INodeEditModeProps {
    // node?: INode;
    nodeId: string;
    node: INode;
    TurnOffEditMode: () => void;
    DeleteNode: () => void;
};

interface INodeEditState {
    header: string,
    description: string
};

class NodeEditMode extends React.Component<INodeEditModeProps, INodeEditState>{
    state = {
        header: this.props.node.header,
        description: this.props.node.description
    };

    // handleHeaderChange(e: any) {
    handleHeaderChange = (text: any) => {
        // handleHeaderChange (text:any)  {
        console.log(text.target.value);
        this.setState({
            header: text.target.value
        })
    }
    handleDescriptionChange = (text: any) => {
        console.log(text.target.value);
        this.setState({
            description: text
        })
    }
    render() {
        const { node, TurnOffEditMode, DeleteNode } = this.props;

        return (
            <div style={{
                // border: "1px solid Aqua",
                // float: "left",
                // minWidth: "90%"
                width: "100%",
                marginTop: "3px",
                marginBottom: "3px"
            }} >
                {/* <Input defaultValue={node.header} style={{ width: "100%" }} /> */}
                <Input
                    style={{ width: "100%" }}
                    defaultValue={this.state.header}
                    // onChange={(e) => this.handleHeaderChange(e)}
                    onChange={this.handleHeaderChange}
                />
                <TextArea
                    defaultValue={node.description}
                    style={{ minWidth: "100%" }}
                    autoHeight={true}
                    onChange={this.handleDescriptionChange}
                />
                <Button> save node </Button>
                <Button onClick={TurnOffEditMode}> exit without saving </Button>
                <Button onClick={DeleteNode} > delete node</Button>
                <Button >delete sub-nodes</Button>
                <Button >toggle done</Button>

            </div>
        )
    }
}

// export default NodeEditMode;

const mapStatetoProps = (state: IState, ownProps: INodeEditModeProps) => ({
    node: state.nodes[ownProps.nodeId],
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INodeEditModeProps) => ({
    // switchToEditMode: () => dispatch(PassEditModeToId(ownProps.node.Id))
    TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    DeleteNode: () => dispatch(DeleteNodeWithId(ownProps.nodeId))
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NodeEditMode);
export default ConnectedEditableNode;