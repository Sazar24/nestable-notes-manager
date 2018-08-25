import * as React from 'react';
import { connect } from "react-redux";
import { INode } from '../../models/Node';
import { Input, Container } from 'semantic-ui-react';
import { IState } from '../../reducers';

// a może onClick (nowaNotka) twórz nową notkę z ID, nie usuwaj jej, tylko pusty nagłówek i description. Nie usuwać gdy click outside; 
// Plusem będzie możliwość utworzenia kilku pustych notatek, a header_onclick będzie edycja headera.
interface INodeEditMode {
    // node?: INode;
    nodeId: string;
    node: INode;
}
// onClickOutside => saveTheNode => turnOffEditMode
class NodeEditMode extends React.Component<INodeEditMode>{
    public render() {
        const { node } = this.props;

        return (
            <div style={{ border: "1px solid Aqua", float: "left", minWidth: "51%" }} >
                new Node ({node.Id}):
                <Input placeholder={node.header} />
                <Input placeholder={node.description} />
            </div>
        )
    }
}

// export default NodeEditMode;

const mapStatetoProps = (state: IState, ownProps: any) => ({
    node: state.nodes[ownProps.nodeId],
})

const ConnectedEditableNode = connect<any, any, any>(mapStatetoProps)(NodeEditMode);
export default ConnectedEditableNode;