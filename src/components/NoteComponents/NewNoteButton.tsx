import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNote } from "../../actions/NotesActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";

interface INewNoteButton {
    noteId: string;
    CreateNewNoteWithParentIdClicked: () => void;
};

class NewNoteButton extends React.Component<INewNoteButton> { // Maybe it doesnt have to be a separated component, but I'll propably reuse this button with its functionality.
    handleClick = () => {
        this.props.CreateNewNoteWithParentIdClicked();
    }

    render() {
        const { CreateNewNoteWithParentIdClicked, noteId } = this.props;
        return (
            <Button
                basic={true}
                icon={true}
                onClick={this.handleClick}
            >
                <Icon name="plus" />
            </Button>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNoteButton) => ({
    CreateNewNoteWithParentIdClicked: () => dispatch(CreateNote(v1(), ownProps.noteId)),
});

export default connect<any, any, any>(null, mapDispatchToProps)(NewNoteButton);