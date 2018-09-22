import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import { CreateNode } from "../actions/NodesActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import MainList from "../components/MainList";

interface IProps {
  addNewBranchClicked: () => void,
}

class MainView extends React.Component<IProps>{
  render() {
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
  addNewBranchClicked: () => dispatch(CreateNode(v1()))
})


export default connect<any, any, any>(null, mapDispatchToProps)(MainView);