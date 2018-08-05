import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNewNodeAsChild } from "../actions/TaskListActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";
interface INewNodeButton {
    nodeId: string;
    // CreateNewNodeWithParentIdClicked: () => void,
    CreateNewNodeWithParentIdClicked: () => void;
}

class NewNodeButton extends React.Component<INewNodeButton> {
    public render() {
        const { CreateNewNodeWithParentIdClicked, nodeId } = this.props;
        return (
            <Button
                basic={true}
                icon={true}
                floated="right"
                onClick={() => CreateNewNodeWithParentIdClicked()}
            >
                <Icon name="plus" />
            </Button>
        );
    }
}

// export default NewNodeButton;

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNodeButton) => ({
    CreateNewNodeWithParentIdClicked: () => dispatch(CreateNewNodeAsChild(ownProps.nodeId, v1()))
});

export default connect<any, any, any>(
    null,
    mapDispatchToProps
)(NewNodeButton);
