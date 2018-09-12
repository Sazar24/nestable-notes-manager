import * as React from "react";
import { List } from "semantic-ui-react";
// import { INode } from "../models/Node";
// import { v1 } from 'uuid';
import { connect } from 'react-redux';
import ConnectedNodeWithChildren from "./NodeComponents/NodeWithChildren";
import { IGlobalReduxState } from "../reducers/index";
// import { Dispatch } from "redux";
import { Dispatch } from "redux";
import { AddLoadedNode } from "../actions/TaskListActions";
import store from "../store/store";
import LocalStorageAccessor from "../services/LocalStorage";

class MainList extends React.Component<IGlobalReduxState>{
  render() {
    const { nodes } = this.props;

    return (
      <div>
        <List>
          {nodes.map((node) => {
            return node.parentID === null ?
              <ConnectedNodeWithChildren key={node.Id} nodeId={node.Id} />
              : null;
          })}

        </List>
      </div>
    );
  }

  componentWillMount() {
    // const localStorageAccessor:any = new LocalStorageAccessor();
    // localStorageAccessor.mapLocalStorageItemsToReduxState(store);
  }
}

const mapStateToProps = (state: IGlobalReduxState) => ({
  nodes: state.nodes
})


export default connect<any, any, any>(mapStateToProps)(MainList);