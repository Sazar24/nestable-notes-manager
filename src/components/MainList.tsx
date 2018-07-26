import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Task";
import { v1 } from 'uuid';
import { connect } from 'react-redux';
import NodeWrapper from './Node';
import { IState } from "../reducers";
import { ENGINE_METHOD_DIGESTS } from "constants";

// interface IProps {
//   // taskItems: IState,
//   nodes: INode[],
//   // addNewBranchClicked: () => void,
// }

class MainList extends React.Component<IState>{
  public render() {
    const { nodes } = this.props;
    // const { nodes, addNewBranchClicked } = this.props;
    // console.log(nodes);
    // Object.keys(nodes).ma forEach(item=>{

    // })
    //  console.log(this.props.nodes["1"] );
    return (
      <div>
        <List>
          <List.Item>
            {Object.keys(nodes).map((nodeID) => {
              // nodes[nodeID].parentID === null ? <NodeWrapper /> : null;
              console.log(`nodes[${nodeID}]: ${nodes[nodeID].parentID}`);
              return nodes[nodeID].parentID === null ? <NodeWrapper key={nodeID} node={nodes[nodeID]} /> : null;
            })}
          </List.Item>
          {/* {nodes.map((item) => (
            item.parentID === null ?
              <List.Item key={v1()}>
                <NodeWrapper renderChild={true}  />
              </List.Item>
              : console.log({item})
// console.log({item})
          ))} */}
        </List>
      </div>
    );
  }
}


const mapStateToProps = (state: IState) => ({
  nodes: state.nodes,
})

export default connect<any, any, any>(mapStateToProps)(MainList);