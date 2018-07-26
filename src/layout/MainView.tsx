import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import MainList from "../components/containers/MainList";
import { AddTask } from "../actions/TaskListActions";
// import ButtonToggleLoader from "../components/ButtonToggleLoader";
// import MainList from "../components/MainList";
interface IProps {
  addNewBranchClicked: () => void,
}

class MainView extends React.Component<IProps>{
  public render() {
    const { addNewBranchClicked } = this.props;
    console.log("kupa");
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

// export default MainView;

const mapDispatchToProps = {
  addNewBranchClicked: AddTask,
}


export default connect<any, any, any>(null, mapDispatchToProps)(MainView);