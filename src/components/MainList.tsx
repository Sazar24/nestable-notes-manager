import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Node";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import { IGlobalReduxState } from "../reducers";
import ConnectedNodeWithChildren from "./NodeComponents/NodeWithChildren";
// import Node from "./NodeComponents/connectedComponents/ConnectedNode";
// import NodeEditMode from "./NodeComponents/NodeEditMode";
// import ConnectedNodeWrapper from "./NodeComponents/NodeWrapper";

class MainList extends React.Component<IGlobalReduxState>{
   render() {
    const { nodes } = this.props;

    return (
      <div>
        <List>
          {Object.keys(nodes).map((nodeId) => {
            return nodes[nodeId].parentID === null ?
              <ConnectedNodeWithChildren key={nodeId} nodeId={nodeId} />
              : null;
          })}
        </List>
      </div>
    );
  }
}

const mapStateToProps = (state: IGlobalReduxState) => ({
  nodes: state.nodes,
})

export default connect<any, any, any>(mapStateToProps)(MainList);