import * as React from 'react';
import { INode, SingleNode } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';

export interface IProps {
    node: INode
}

// interface IRecurencyTest {
//     renderChild?: boolean
// }

export default class NodeFrame extends React.Component<IProps>{
    // public renderChild = childID  => {
    // YOU ARE HERE
    // }

    public render() {
        const { node } = this.props;
        // const {renderChild} = this.props;
        return (
            <div>
            {/* <List.Item> */}
                <List.Header>
                    {node.header}
                </List.Header>
                <List.Description>
                    {node.description}
                </List.Description>
                {/* <List>
                    {node.childrensID}
                </List> */}
            {/* </List.Item> */}

            {/* {renderChild === true ? <NodeFrame /> : console.log("renderChild === false")} */}
             </div>
        )
    }
}