import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Node";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import ConnectedNodeWithChildren from "./NodeComponents/NodeWithChildren";
import { IGlobalReduxState } from "../reducers/index";
import { Dispatch } from "redux";
import { AddLoadedNode } from "../actions/TaskListActions";
// import LocalStorageHandler from "../services/LocalStorageHandler";
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

  componentWillMount(){
    // LocalStorageHandler.mapLocalStorageItemsToReduxState();
  }
}

const mapStateToProps = (state: IGlobalReduxState) => ({
  nodes: state.nodes,
})

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//     CreateNewNodeWithParentIdClicked: () => dispatch(AddLoadedNode(node)),
// });
export default connect<any, any, any>(mapStateToProps)(MainList);