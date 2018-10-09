import * as React from 'react';
import { connect } from "react-redux";
import { Button, Icon, Popup } from 'semantic-ui-react';
import NoteMenu from './NoteMenu';
import { Note } from '../../models/Note';
import NewNoteButton from './NewNoteButton';
import { Dispatch } from 'redux';
import * as NotesActions from '../../actions/NotesActions';

interface IToolbar {
    note: Note;
    toggleDone: (noteId: string) => void;
}

class Toolbar extends React.Component<IToolbar> {
    constructor(props: IToolbar) {
        super(props);
    }

    render() {
        const { note, toggleDone } = this.props;
        return (
            <div style={{ display: "flex" }}>
                <Button
                    basic={true}
                    icon="check"
                    onClick={() => toggleDone(note.Id)}
                />
                <NewNoteButton noteId={note.Id} />
                <Popup
                    hoverable={true}
                    trigger={
                        <Button basic={true} icon={true} >
                            <Icon name="ellipsis vertical" />
                        </Button>
                    }
                    on={['hover', 'click']}
                    style={{ padding: "0px", backgroundColor: "aqua" }}
                >
                    <NoteMenu note={note} />
                </Popup>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch: Dispatch, ownProps: IToolbar) => ({
    toggleDone: (noteId: string) => dispatch(NotesActions.toglleDoneNotesBranch(noteId)),
});

export default connect<any, any, any>(null, mapDispatchToProps)(Toolbar);
