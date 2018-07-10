import * as React from "react";
import { connect } from 'react-redux';
// import {connec}
import { List } from "semantic-ui-react";
// import ListItemContainer from "./ListItemContainer";
import { IState } from "../reducers";

class MainList extends React.Component {
  public render() {
    return (
      <div>
        <List>
          bźdong
          {/* {this.props.taskItem.map(item => ( */}
          {/* {this.props.taskItems.map(item => (
            <ListItemContainer>
              {item}
                </ListItemContainer>
          ))} */}

          {/* <List.Item>
          //TODO: tutaj map po itemach ze stora.
          <ListItemContainer>
            mleko
          </ListItemContainer>
        </List.Item>
        <List.Item>
          <ListItemContainer>
            kapusta
          </ListItemContainer>
        </List.Item>
        <List.Item>
          <ListItemContainer>
            fooobar3
          </ListItemContainer>
        </List.Item> */}
        </List>
      </div>
    );
  }
}
// export default MainList;

const mapStateToProps = (state: IState) => ({
  // todos: getTodos(state)
  taskItems: state.taskItems,
})

export default connect<any, any, any>(mapStateToProps)(MainList);

// // 
// const mapStateToProps = (state: State) => ({
//   todos: getTodos(state)
// })

// const mapDispatchToProps = {
//   onTodoClicked: toggleTodo
// }

// export default connect<any, any, any>(mapStateToProps, mapDispatchToProps)(TodosList)