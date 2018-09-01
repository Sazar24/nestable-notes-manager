import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNewNodeAsChild } from "../../actions/TaskListActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";

interface INewNodeButton {
    nodeId: string;
    CreateNewNodeWithParentIdClicked: () => void;
}

class NewNodeButton extends React.Component<INewNodeButton> {
    public render() {
        const { CreateNewNodeWithParentIdClicked, nodeId } = this.props;
        return (
            // <div style={{ width: "20%", backgroundColor: "aqua" }}>
            <div style={{
                float: "right",
                width: "5%" // need to extend it to max-possible
            }}>
                <Button
                    basic={true}
                    icon={true}
                    floated="right"
                    onClick={() => CreateNewNodeWithParentIdClicked()}
                >
                    <Icon name="plus" />
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNodeButton) => ({
    CreateNewNodeWithParentIdClicked: () => dispatch(CreateNewNodeAsChild(v1(), ownProps.nodeId)),
});

export default connect<any, any, any>(
    null,
    mapDispatchToProps
)(NewNodeButton);
