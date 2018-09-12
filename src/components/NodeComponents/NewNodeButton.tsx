import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNode } from "../../actions/TaskListActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";

interface INewNodeButton {
    nodeId: string;
    CreateNewNodeWithParentIdClicked: () => void;
}

class NewNodeButton extends React.Component<INewNodeButton> {
    handleClick = (e: Event) => {
        e.stopPropagation();
        this.props.CreateNewNodeWithParentIdClicked();
    }
    render() {
        const { CreateNewNodeWithParentIdClicked, nodeId } = this.props;
        return (
            <div style={{
                float: "right",
                width: "5%" // need to extend it to max-possible
            }}>
                <Button
                    basic={true}
                    icon={true}
                    floated="right"
                    onClick={(e: any) => this.handleClick(e)}
                >
                    <Icon name="plus" />
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNodeButton) => ({
    // CreateNewNodeWithParentIdClicked: () => dispatch(CreateNewNodeAsChild(v1(), ownProps.nodeId)),
    CreateNewNodeWithParentIdClicked: () => dispatch(CreateNode(v1(), ownProps.nodeId)),
});

export default connect<any, any, any>(
    null,
    mapDispatchToProps
)(NewNodeButton);
