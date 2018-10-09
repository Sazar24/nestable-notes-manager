import * as React from 'react';
import { Menu, Button, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { IGlobalReduxState } from '../../reducers';
import { Dispatch } from 'redux';
import * as NotesActions from '../../actions/NotesActions';
import * as NoteSelecing from '../../actions/NoteSelecting';
import { INote } from '../../models/Note';

interface INoteMenu {
    note: INote;
    TurnOnEditMode: () => void;
    TurnOffEditMode: () => void;    // TODO: Zrobić jeden przycisk 'On/Off Edit Mode'
    DeleteNote: () => void;
    MoveLevelUp: () => void;
    RememberNoteId: () => void;
    PasteNoteAsChildToThisNote: (movingNoteId: string) => void;
    cuttedIdInClipboard: string;
}

class NoteMenu extends React.Component<INoteMenu> {
    constructor(props: INoteMenu) {
        super(props);
    }

    render(): any {
        const { TurnOnEditMode, TurnOffEditMode, DeleteNote, MoveLevelUp, RememberNoteId, PasteNoteAsChildToThisNote, cuttedIdInClipboard } = this.props;
        return (
            <div>
                <Menu size="mini" vertical={true} compact={true} >
                    <Menu.Item name="edit" onClick={TurnOnEditMode} />
                    <Menu.Item name="exit edit mode" onClick={TurnOffEditMode} />
                    <Menu.Item name="delete" onClick={DeleteNote} />
                    <Menu.Item name="move me up" onClick={MoveLevelUp} />
                    <Menu.Item name="cut note" onClick={RememberNoteId} />
                    <Menu.Item
                        name="Paste"
                        onClick={() => PasteNoteAsChildToThisNote(cuttedIdInClipboard)}
                    />
                </Menu>
            </div>
        );
    }
}

const mapStatetoProps = (state: IGlobalReduxState) => ({
    cuttedIdInClipboard: state.selectedNotes.IdOfCuttedNote
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: INoteMenu) => ({
    TurnOnEditMode: () => dispatch(NoteSelecing.PassEditModeToId(ownProps.note.Id)),
    TurnOffEditMode: () => dispatch(NoteSelecing.PassEditModeToId(null)),
    DeleteNote: () => dispatch(NotesActions.DeleteNote(ownProps.note.Id)),
    MoveLevelUp: () => dispatch(NotesActions.MoveNoteCloserToAncestor(ownProps.note)),
    RememberNoteId: () => dispatch(NoteSelecing.SelectAndRememberNoteId(ownProps.note.Id)),
    PasteNoteAsChildToThisNote: (movingNoteId: string) => dispatch(NotesActions.PasteAsChild(movingNoteId, ownProps.note.Id)),
})

const ConnectedEditableNote = connect<any, any, any>(mapStatetoProps, mapDispatchToProps)(NoteMenu);
export default ConnectedEditableNote;