import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import { CreateNode } from "../actions/NodesActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import MainList from "../components/MainList";
import LocalStorageAccessor from "../services/LocalStorage";
import { helloNodes } from "../helloData/helloNotes";
import store from "../store/store";

interface IProps {
  addNewBranchClicked: () => void,
}

interface IState {
  isItFirstAppUse: boolean;
}

class MainView extends React.Component<IProps, IState>{

  componentWillMount() {
    const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();
    const isItFirstAppUse = localStorageAccessor.isItFirstUse();
    this.setState({
      isItFirstAppUse
    });
  }

  loadExampleData = () => {
    const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();
    localStorageAccessor.loadHelloData(helloNodes, store);
    this.setState({
      isItFirstAppUse: false,
    });
    console.log("kupa?");
  }

  render() {
    const { addNewBranchClicked } = this.props;
    return (

      <Container>
        {this.state.isItFirstAppUse && (
          <Button
            label="it seems this is the first time you are using this app. Let me show you an example how it can be used."
            labelPosition="right"
            size="massive"
            color="teal"
            content="run example"
            onClick={this.loadExampleData}
          />
        )}

        {!this.state.isItFirstAppUse &&
          <div>
            <MainList />
            <Button
              basic={true}
              icon={true}
              floated="right"
              onClick={() => addNewBranchClicked()}
            >
              <Icon name="plus" />
            </Button>
            <Button basic={true} icon={true} size="tiny" floated="left">
              <Icon name="trash" />
            </Button >
          </div>
        }
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewBranchClicked: () => dispatch(CreateNode(v1()))
})

export default connect<any, any, any>(null, mapDispatchToProps)(MainView);