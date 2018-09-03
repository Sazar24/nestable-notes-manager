import * as React from "react";
import { connect } from "react-redux";
import { INode, SingleNode } from "../../models/Node";
import { List, Container, Button } from "semantic-ui-react";
import { v1 } from "uuid";
import FindNodesChildren from "../../services/findNodesChildren";
import NewNodeButton from "./NewNodeButton";
import NodeContentWithoutChildren from "./NodeContentWithoutChildren";
import { IGlobalReduxState } from "../../reducers/index";

export interface IProps {
  nodeId: string;
  node: INode;
  childrenIDs: string[];
}

export class NodeWithChildren extends React.Component<IProps> {

   renderMyChilds() {
    const { childrenIDs } = this.props;
    if (!childrenIDs || childrenIDs.length === 0) {
      return;
    }

    return (
      <List>
        {childrenIDs.map(id => {
          return (
            <List.Item key={id}>
              <ConnectedNodeWithChildren nodeId={id} />
            </List.Item>
          );
        })}
      </List>
    );
  }

   render(): any {
    const { node } = this.props;
    if (node === undefined) {
      throw new Error("passed undefined {node} to NodeFrame");
    }

    return (
      <List.Item style={{
        // minWidth: "500px",
        minWidth: "90%",
        padding: "0 0 0 8px",
        border: "1px solid black",
        backgroundColor: "silver",
        marginBottom: "2px",
        display: "inherit",
        // clear: "both"
      }}>

        <div style={{ display: "inline-flex", width: "100%" }}>
          <NodeContentWithoutChildren node={node} />
          <NewNodeButton nodeId={this.props.nodeId} />
        </div>
        {this.renderMyChilds()}
      </List.Item>
    );
  }
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: IProps) => ({
    node: state.nodes[ownProps.nodeId],
    childrenIDs: new FindNodesChildren().call(ownProps.nodeId, state)
})

const ConnectedNodeWithChildren = connect<any, any, any>(mapStateToProps)(NodeWithChildren);
export default ConnectedNodeWithChildren;