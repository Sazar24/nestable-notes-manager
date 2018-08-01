import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Node";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import NodeFrame from './Node';
import { IState } from "../reducers";

class MainList extends React.Component<IState>{
  public render() {
    const { nodes } = this.props;

    return (
      <div>
        <List>
          <List.Item>
            {Object.keys(nodes).map((nodeId) => {
              return nodes[nodeId].parentID === null
                ? <NodeFrame key={nodeId} nodeId={nodeId} />
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