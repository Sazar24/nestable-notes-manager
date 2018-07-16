import * as React from "react";
import { List } from "semantic-ui-react";
import { ITask } from "../models/Task";
// const uuidv1 = require('uuid/v1');
import { v1 } from 'uuid';
import TreeBranch from './TreeBranch';

interface IProps {
  // taskItems: IState,
  taskItems: ITask[],
}

export default class MainList extends React.Component<IProps>{
  public render() {
    const { taskItems } = this.props;

    return (
      <div>
        <List>
          {taskItems.map((item) => (
            (
              <List.Item key={v1()}>
                <TreeBranch taskItem={item} />
              </List.Item>
              // <TreeBranch
              // taskItem = { item }
              // // header = {item.header}
              // // description = {item.description}
              // // ID = {item.ID}
              // // childrensID = {item.children}
              // // ?parent = {}
              // />

              // <List.Item key={v1()}>
              //   <List.Header>
              //     {item.header}
              //   </List.Header>
              //   <List.Description>
              //     {item.description}
              //   </List.Description>
              // </List.Item>
            )
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