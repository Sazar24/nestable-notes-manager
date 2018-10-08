import * as React from 'react';
import { connect } from 'react-redux';
import { INote, Note } from "../../models/Note";
import { List, Reveal, Image, Button, Icon } from 'semantic-ui-react';
import ConnectedEditableNote from './NoteEditMode';
import { Dispatch } from 'redux';
import { PassEditModeToId } from '../../actions/NoteSelecting';
import { IGlobalReduxState } from '../../reducers/index';

interface INoteMainContent {
    note: Note;
    editMode: boolean;
    isDone: boolean;
    switchToEditMode: () => void;
}

class NoteContentWithoutChildrenUnconnected extends React.Component<INoteMainContent>{
    render() {
        const { note, editMode, switchToEditMode, isDone } = this.props;
        const decorationStyle = isDone ? "line-through" : "none";

        if (editMode)
            return <ConnectedEditableNote noteId={note.Id} />
        else {
            return (
                <div style={{
                    width: "100%", paddingRight: "15px",
                    whiteSpace: "pre-wrap", wordWrap: "break-word", wordBreak: "keep-all",
                    textAlign: "justify", textJustify: "inter-word", textOverflow: "clip",
                    textDecoration: decorationStyle,
                }}
                    onDoubleClick={() => switchToEditMode()}
                >
                    <List.Header >
                        {note.header}
                    </List.Header>
                    <List.Description>
                        {note.description}
                    </List.Description>
                </div>
            )
        }
    }
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: INoteMainContent) => ({
    editMode: (ownProps.note.Id === state.selectedNotes.IdOfEditableNote) ? true : false,
    isDone: ownProps.note.isDone
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INoteMainContent) => ({
    switchToEditMode: () => dispatch(PassEditModeToId(ownProps.note.Id))
})

const NoteContentWithoutChildren = connect<any, any, any>(mapStateToProps, mapDispatchToProps)(NoteContentWithoutChildrenUnconnected);
export default NoteContentWithoutChildren;