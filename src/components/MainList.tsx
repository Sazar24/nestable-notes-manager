import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Node";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { IState } from "../reducers";
import Node from "./NodeComponents/connectedComponents/ConnectedNode";
import NodeEditMode from "./NodeComponents/NodeEditMode";
import ConnectedNodeWrapper from "./NodeComponents/NodeWrapper";

class MainList extends React.Component<IState>{
  public render() {
    const { nodes } = this.props;

    return (
      <div>
        <List>
          {Object.keys(nodes).map((nodeId) => {
            console.log(`in MainList: nodeId = ${nodeId}`);
            return nodes[nodeId].parentID === null ?
              <Node key={nodeId} nodeId={nodeId} />
              // <ConnectedNodeWrapper key={nodeId} nodeId={nodeId} />
              : null;
          })}
        </List>
        {/* <NodeEditMode /> */}
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => ({
  nodes: state.nodes,
})

export default connect<any, any, any>(mapStateToProps)(MainList);