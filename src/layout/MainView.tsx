import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
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
        {/* <NewNodeButton nodeId={null} /> */}
        {/* <Button basic={true} icon={true}
          onClick={() => addNewBranchClicked()}
        >
          <Icon name='plus' />
        </Button> */}
        {/* <NewNodeButton nodeId={this.props.nodeId} /> */} 
        {/* TODO: tu zrobić oddzielnego dispatchera na tworzenie nowej notki BEZ ID rodzica */}
      </Container>
    );
  }
};

const mapDispatchToProps = {
  // addNewBranchClicked: AddTask,
}


export default connect<any, any, any>(null, mapDispatchToProps)(MainView);