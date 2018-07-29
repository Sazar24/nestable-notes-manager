import * as React from 'react';
import { connect } from 'react-redux';
import { INode, SingleNode } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';
import { IState } from '../reducers';

export interface IProps {
    nodeId: string;
    node: INode;
    childrenIDs: string[],
}

class NodeFrame extends React.Component<IProps>{

    public renderMyChilds() {
        const { childrenIDs } = this.props;
        if (!childrenIDs || childrenIDs.length === 0) {
            console.log("renderMyChilds: Im out!");
            return
        };

        return (
            <List>
                {
                    childrenIDs.map((id) => {
                        return (
                            <List.Item key={id}>
                                <ConnectedNodeFrame nodeId={id} />
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }

    public render(): any {
        const { node } = this.props;
        if (node === undefined) throw new Error(' passed undefined {node} to NodeFrame');
        return (
            <div>
                <List.Header>
                    {/* {node.header} */}
                    this node id: {node.ID}
                </List.Header>
                <List.Description>
                    parent: {(node.parentID) ? node.parentID : "(i dont have any parents)"}
                    {/* {node.description} + {node.ID} bbb */}
                </List.Description>
                {this.renderMyChilds()}
            </div>
        )
    }
}

function findMyChildrenIDs(thisID: string, state: IState): string[] {
    const childrenIDs: string[] = [];
    Object.keys(state.nodes).map((nodeID) => {
        const node = state.nodes[nodeID];
        if (node.parentID === thisID) {
            childrenIDs.push(node.ID);
            console.log(`found a match with id=${thisID}`)
        }
    })
    return childrenIDs;
}

const mapStateToProps = (state: IState, ownProps: IProps) => ({
    node: state.nodes[ownProps.nodeId],
    childrenIDs: findMyChildrenIDs(ownProps.nodeId, state)
})

const ConnectedNodeFrame = connect<any, any, any>(mapStateToProps)(NodeFrame);
export default ConnectedNodeFrame;


