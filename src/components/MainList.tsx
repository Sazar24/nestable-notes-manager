import * as React from "react";
import { List, Button, Icon } from "semantic-ui-react";
import { INode } from "../models/Task";
import { v1 } from 'uuid';
import NodeWrapper from './Node';

interface IProps {
  // taskItems: IState,
  nodes: INode[],
  addNewBranchClicked: () => void,
}

export default class MainList extends React.Component<IProps>{
  public render() {
    const { nodes, addNewBranchClicked } = this.props;

    return (
      <div>
        <List>
          {nodes.map((item) => (
            item.parentID === null ?
              <List.Item key={v1()}>
                {/* <NodeWrapper node={item} /> */}
                <NodeWrapper renderChild={true}  />
              </List.Item>
              : console.log({item})
// console.log({item})
          ))}
        </List>
      </div>
    );
  }
}

///////////////////////////////////////////////
/*<List.Item>
  <ListItemContainer>
    mleko
</ListItemContainer>
</List.Item>
  <List.Item>
    <ListItemContainer>
      kapustaa
</ListItemContainer>
  </List.Item>
  <List.Item>
    <ListItemContainer>
      fooobar3
</ListItemContainer>
  </List.Item> */