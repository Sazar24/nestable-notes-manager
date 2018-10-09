import * as React from "react";
import { connect } from 'react-redux';
import { Container, Button, Icon } from "semantic-ui-react";
import { CreateNote } from "../actions/NotesActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";
import MainList from "../components/MainList";
import LocalStorageAccessor from "../services/LocalStorage";
import { helloNotes } from "../helloData/helloNotes";
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
    localStorageAccessor.loadHelloData(helloNotes, store);
    this.setState({
      isItFirstAppUse: false,
    });
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
              floated="left"
              onClick={() => addNewBranchClicked()}
            >
              <Icon name="plus" />
            </Button>
          </div>
        }
      </Container>
    );
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNewBranchClicked: () => dispatch(CreateNote(v1()))
})

export default connect<any, any, any>(null, mapDispatchToProps)(MainView);