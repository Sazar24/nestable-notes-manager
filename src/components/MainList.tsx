import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Task";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import NodeFrame from './Node';
import { IState } from "../reducers";
import { ENGINE_METHOD_DIGESTS } from "constants";

class MainList extends React.Component<IState>{
  public render() {
    const { nodes } = this.props;

    return (
      <div>
        <List>
          <List.Item>
            {Object.keys(nodes).map((nodeID) => {
              return nodes[nodeID].parentID === null
                ? <NodeFrame key={nodeID} nodeID={nodeID} />
                : null;
            })}
          </List.Item>
        </List>
      </div>
    );
  }
}


const mapStateToProps = (state: IState) => ({
  nodes: state.nodes,
})

export default connect<any, any, any>(mapStateToProps)(MainList);