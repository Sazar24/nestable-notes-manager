import * as React from 'react';
import { Button, Icon, Popup } from 'semantic-ui-react';
import NodeMenu from './NodeMenu';

interface IToolbar {
    nodeId: string;
    // CreateNewNodeWithParentIdClicked: () => void;
}

class Toolbar extends React.Component<IToolbar> {
    constructor(props: IToolbar) {
        super(props);
    }

    render() {
        return (
            // <div style={{
            //     float: "right",
            //     // width: "15%" // need to extend it to max-possible
            //     display: "flex"
            // }}>
            <Popup
                // flowing
                hoverable
                trigger={
                    <Button basic={true} icon={true} >
                        <Icon name="ellipsis vertical" />
                    </Button>
                }
            >
                <NodeMenu nodeId = {this.props.nodeId}/>
            </Popup>
            // </div>
        );
    }
}

export default Toolbar;
