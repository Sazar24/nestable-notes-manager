import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import { CreateNewNodeWithoutParent } from "../actions/TaskListActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import MainList from "../components/MainList";
import NewNodeButton from "../components/NewNodeButton";
// import { AddTask } from "../actions/TaskListActions";

interface IProps {
  addNewBranchClicked: () => void,
}

class MainView extends React.Component<IProps>{
  public render() {
    const { addNewBranchClicked } = this.props;
    return (
      <Container>
        <MainList />
        <Button
          basic={true}
          icon={true}
          floated="right"
          onClick={() => addNewBranchClicked()}
        >
          <Icon name="plus" />
        </Button>
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewBranchClicked: () => dispatch(CreateNewNodeWithoutParent(v1()))
})


export default connect<any, any, any>(null, mapDispatchToProps)(MainView);