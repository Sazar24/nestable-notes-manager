import * as React from 'react';
import { connect } from "react-redux";
import { INote, Note } from '../../models/Note';
import { Input, Container, TextArea, Button, InputOnChangeData } from 'semantic-ui-react';
import { IGlobalReduxState } from '../../reducers/index';
import { PassEditModeToId } from '../../actions/NoteSelecting';
import { Dispatch } from 'redux';
import * as NotesActions from '../../actions/NotesActions';

import NotesManager from '../../services/NotesManager';

interface INoteEditModeProps {
    noteId: string;
    note: INote;
    allDescendatsIds: string[];
    TurnOffEditMode: () => void;
    DeleteNoteClick: () => void;
    DeleteNoteById: (id: string) => void;
    SaveNoteContent: (note: INote) => void;
    DeleteAllChildren: (noteId: string) => void;
    MoveLevelUp: (note: Note) => void;
};

interface INoteEditState {
    note: INote,
};

class NoteEditMode extends React.Component<INoteEditModeProps, INoteEditState>{
    inputRef: any;
    state = {
        note: this.props.note
    };

    handleHeaderChange = (e: any) => {
        const newNote = Object.assign({}, this.state.note);
        newNote.header = e.target.value;
        this.setState({
            note: newNote
        })
    }

    handleDescriptionChange = (e: any) => {
        const newNote = Object.assign({}, this.state.note);
        newNote.description = e.target.value;
        this.setState({
            note: newNote
        })
    }

    handleFocus(event: any) {
        event.target.select();
    }

    handleRef = (c: any) => {
        this.inputRef = c;
    }

    componentDidMount() {
        if (this.inputRef === undefined || this.inputRef === null) return;
        this.inputRef.focus();
    }

    render() {
        const { note, TurnOffEditMode, DeleteNoteClick, SaveNoteContent, MoveLevelUp } = this.props;

        return (
            <div style={{
                width: "100%",
                marginTop: "3px",
                marginBottom: "3px"
            }} >
                <Input
                    style={{ width: "100%" }}
                    defaultValue={this.state.note.header}
                    onChange={this.handleHeaderChange}
                    onFocus={this.handleFocus}
                    ref={this.handleRef}
                />
                <TextArea
                    defaultValue={note.description}
                    style={{ minWidth: "100%" }}
                    autoHeight={true}
                    onChange={this.handleDescriptionChange}
                    onFocus={(e: any) => this.handleFocus(e)}
                />
                <Button onClick={() => SaveNoteContent(this.state.note)}>save note</Button>
                <Button onClick={TurnOffEditMode}>exit edit-mode</Button>
                <Button onClick={DeleteNoteClick}>delete note</Button>
                <Button onClick={() => MoveLevelUp(note)}>move level up</Button>
            </div>
        )
    }
}

const mapStatetoProps = (state: IGlobalReduxState, ownProps: INoteEditModeProps) => ({
    note: new NotesManager().findNote(ownProps.noteId, state.notes),
    allDescendatsIds: new NotesManager().findAllDescendantsIds(ownProps.noteId, state.notes),
});

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INoteEditModeProps) => ({
    TurnOffEditMode: () => dispatch(PassEditModeToId(null)),
    DeleteNoteClick: () => dispatch(NotesActions.DeleteNote(ownProps.noteId)),
    SaveNoteContent: (note: INote) => dispatch(NotesActions.ChangeNoteContent(note)),
    MoveLevelUp: (note: Note) => dispatch(NotesActions.MoveNoteCloserToAncestor(note)),
});

const ConnectedEditableNote = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NoteEditMode);
export default ConnectedEditableNote;