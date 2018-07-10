import * as React from 'react';
import "semantic-ui-css/semantic.min.css";
import { Container, Icon } from 'semantic-ui-react';
import MainView from "../layout/MainView";

class App extends React.Component {
  public render() {
    return (
      <Container>
        <Icon name="deaf"> abracadabra </Icon>
        <MainView />
      </Container>

    );
  }
}

export default App;