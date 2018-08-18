import * as React from 'react';
import { INode } from '../../models/Node';
import { Input, Container } from 'semantic-ui-react';

interface INodeEditMode {
    node?: INode;
}
class NodeEditMode extends React.Component<INodeEditMode>{
    public render() {
        return (
            <div style={{ border: "1px solid Aqua", float: "left" }} >
                new Node:
                <Input placeholder="header" />
                <Input placeholder="description" />
            </div>
        )
    }
}

export default NodeEditMode;
// a może onClick (nowaNotka) twórz nową notkę z ID, nie usuwaj jej, tylko pusty nagłówek i description. Nie usuwać gdy click outside; 
// Plusem będzie możliwość utworzenia kilku pustych notatek, a header_onclick będzie edycja headera.