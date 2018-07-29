import * as React from 'react';
import { connect } from 'react-redux';
import { INode, SingleNode } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';
import { IState } from '../reducers';

export interface IProps {
    nodeID: string;
    node: INode;
    childrenIDs?: string[] | null,
}

class NodeFrame extends React.Component<IProps>{

    public renderMyChilds(): any {
        const { childrenIDs } = this.props;
        if (!childrenIDs || childrenIDs.length === 0) {
            return
        };

        return (
            <List>
                {
                    childrenIDs.map((ID) => {
                        return (
                            <List.Item key={ID}>
                                {/* <NodeFrame nodeID={ID} /> */}
                                foobar with id = {ID}
                            </List.Item>
                        )
                    })
                }
            </List>
        )
    }

    public render(): any {
        const { node } = this.props;
        return (
            <div>
                <List.Header>
                    {node.header}
                </List.Header>
                <List.Description>
                    {node.description} + {node.ID}
                </List.Description>
                {this.renderMyChilds()}
            </div>
        )
    }
}

function myChildsIDs(thisID: string, state: IState): string[] {
    const childrenIDs: string[] = [];
    Object.keys(state.nodes).map((nodeID) => {
        const node = state.nodes[nodeID];
        if (node.parentID === thisID) {
            childrenIDs.push(node.ID);
        }
    })
    return childrenIDs;
}

const mapStateToProps = (state: IState, ownProps: IProps) => ({
    node: state.nodes[ownProps.nodeID],
    childrenIDs: myChildsIDs(ownProps.nodeID, state)
})

const ConnectedNodeFrame = connect<any, any, any>(mapStateToProps)(NodeFrame);
export default ConnectedNodeFrame;


