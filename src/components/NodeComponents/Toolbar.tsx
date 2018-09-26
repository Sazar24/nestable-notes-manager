import * as React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import NodeMenu from './NodeMenu';
import { Node } from '../../models/Node';
import NewNodeButton from './NewNodeButton';

interface IToolbar {
    // nodeId: string;
    node: Node;
    // CreateNewNodeWithParentIdClicked: () => void;
}

class Toolbar extends React.Component<IToolbar> {
    constructor(props: IToolbar) {
        super(props);
    }

    render() {
        const { node } = this.props;
        return (
            // <div style={{
            //     float: "right",
            //     // width: "15%" // need to extend it to max-possible
            //     display: "flex"
            // }}>
            <div style={{ display: "flex" }}>
                <NewNodeButton nodeId={node.Id} />
                <Popup
                    // flowing
                    hoverable={true}
                    trigger={
                        <Button basic={true} icon={true} >
                            <Icon name="ellipsis vertical" />
                        </Button>
                    }
                    on={['hover', 'click']}
                    style={{ padding: "0px", backgroundColor: "aqua" }}
                >
                    <NodeMenu node={node} />
                </Popup>
            </div>
            // </div>
        );
    }
}

export default Toolbar;
