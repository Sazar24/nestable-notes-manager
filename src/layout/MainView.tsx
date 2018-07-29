import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import MainList from "../components/MainList";
import { AddTask } from "../actions/TaskListActions";

interface IProps {
  addNewBranchClicked: () => void,
}

class MainView extends React.Component<IProps>{
  public render() {
    const { addNewBranchClicked } = this.props;
    return (
      <Container>
        <MainList />
        <Button basic={true} icon={true}
          onClick={() => addNewBranchClicked()}
        >
          <Icon name='plus' />
        </Button>
      </Container>
    );
  }
};

const mapDispatchToProps = {
  addNewBranchClicked: AddTask,
}


export default connect<any, any, any>(null, mapDispatchToProps)(MainView);