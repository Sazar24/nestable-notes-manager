import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNewNodeWithParentId, AddTask } from "../actions/TaskListActions";
import { Dispatch } from "redux";

interface INewNodeButton {
  nodeId: string;
  // CreateNewNodeWithParentIdClicked: () => void,
  CreateNewNodeWithParentIdClicked: () => void;
}

class NewNodeButton extends React.Component<INewNodeButton> {
  public render() {
    const { CreateNewNodeWithParentIdClicked } = this.props;
    return (
      <Button
        basic={true}
        icon={true}
        floated="right"
        // onClick={(nodeId) => CreateNewNodeWithParentId(this.props.nodeId)}
        // onClick={() => CreateNewNodeWithParentIdClicked()}
        onClick={() => CreateNewNodeWithParentIdClicked()}
      >
        <Icon name="plus" />
      </Button>
    );
  }
}

// export default NewNodeButton;

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNodeButton) => ({
  CreateNewNodeWithParentIdClicked: () =>
    dispatch(CreateNewNodeWithParentId(ownProps.nodeId))
});

export default connect<any, any, any>(
  null,
  mapDispatchToProps
)(NewNodeButton);
