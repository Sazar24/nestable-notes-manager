import * as React from 'react';
import { connect } from 'react-redux';
import { INode, SingleNode } from '../models/Task';
import { List } from "semantic-ui-react";
import { v1 } from 'uuid';
import { IState } from '../reducers';

export interface IProps {
    nodeID: string;
    node: INode;
    childrenIDs: string[] | null,
}

class NodeFrame extends React.Component<IProps>{
    // public renderChild(): any {
    //     const { node } = this.props;
    //     if (node.childrensID) {
    //         return (
    //             <List>
    //                 <ConnectedNodeFrame id={node.childrensID} key={node.childrensID} />
    //             </List>
    //         )
    //     };
    //     return null;
    // }

    public renderMyChilds(): any {
        const { childrenIDs } = this.props;
        if (!childrenIDs || childrenIDs.length === 0) {
            return
        };
        // console.log("trybię. Jestem w :", this.props.node.header);
        // console.log("mój childrenIDS: ", childrenIDs)

        return (
            <List>
                {
                    childrenIDs.map((ID) => {
                        console.log(ID)
                        return (
                            <List.Item key={ID}>
                                {/* <ConnectedNodeFrame key={ID} nodeID={ID} /> */}
                                kuuuuupa o id = {ID}
                            </List.Item>
                        )
                        // renderContent += <div key={ID}>                    kuuuuuuuuuuuuuuuupa {ID} </div>
                        // return  <div key={ID}>                    kuuuuuuuuuuuuuuuupa {ID} </div>
                        // return <div key={ID}>kuuuuuuuuuuuuuuuupa</div>
                        // </div>
                        // </List>
                        // )

                    })
                }
            </List>
        )

        // return (<List>{renderContent}</List>)
    }


    public render() :any{
        const { node } = this.props;
        const { childrenIDs } = this.props;
        if (childrenIDs === null) return;
        return (
            <List>
                <List.Header>
                    {node.header}
                </List.Header>
                <List.Description>
                    {node.description} + {node.ID}
                </List.Description>
                {/* {this.renderMyChilds()} */}
                {                  // this suppose to be in function...
                    childrenIDs.map((id) => {
                        console.log(id)
                        return <div key={id}> kuuuuuuuuuuuuuuuupa</div>
                        // return <ConnectedNodeFrame nodeID={id} key={id} /> 
                    })
                }
            </List>
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
