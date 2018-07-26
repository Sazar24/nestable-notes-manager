import * as React from 'react';
import { INode, SingleNode } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';

export interface IProps {
    node: INode
}

interface IRecurencyTest {
    renderChild?: boolean
}

export default class NodeFrame extends React.Component<IRecurencyTest>{
    public render() {
        // const { node } = this.props;
        const {renderChild} = this.props;
        return (
            <div>
                <List.Header>
                   Node Kupa Header 
                </List.Header>
                <List.Description>
                   Node Kupa Descr 
                </List.Description>

                {/* {renderChild === true ? <NodeFrame /> : console.log("renderChild === false")} */}
            </div>
        )
    }
}