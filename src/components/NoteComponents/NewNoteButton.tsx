import * as React from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { CreateNote } from "../../actions/NotesActions";
import { Dispatch } from "redux";
import { v1 } from "uuid";

interface INewNoteButton {
    noteId: string;
    CreateNewNoteWithParentIdClicked: () => void;
}

// TODO: to niepotrzebnie jest oddzielnym komponentem. Wrzucić do <Toolbar`a />

class NewNoteButton extends React.Component<INewNoteButton> {
    handleClick = (e: Event) => {
        // e.stopPropagation();
        this.props.CreateNewNoteWithParentIdClicked();
    }
    render() {
        const { CreateNewNoteWithParentIdClicked, noteId } = this.props;
        return (
            // <div style={{
            // float: "right",
            // width: "5%" // need to extend it to max-possible
            // }}>
            <Button
                basic={true}
                icon={true}
                // floated="right"
                onClick={(e: any) => this.handleClick(e)}
            >
                <Icon name="plus" />
            </Button>
            // </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INewNoteButton) => ({
    CreateNewNoteWithParentIdClicked: () => dispatch(CreateNote(v1(), ownProps.noteId)),
});

export default connect<any, any, any>(
    null,
    mapDispatchToProps
)(NewNoteButton);
