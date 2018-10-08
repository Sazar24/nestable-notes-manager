import * as React from "react";
import { List } from "semantic-ui-react";
import { connect } from 'react-redux';
import ConnectedNoteWithChildren from "./NoteComponents/NoteWithChildren";
import { IGlobalReduxState } from "../reducers/index";
import { Dispatch } from "redux";
import { AddLoadedNote } from "../actions/NotesActions";
import store from "../store/store";
import LocalStorageAccessor from "../services/LocalStorage";
import { helloNotes } from '../helloData/helloNotes';


class MainList extends React.Component<IGlobalReduxState>{
  render() {
    const { notes } = this.props;

    return (
      <div>
        <List>
          {notes.map((note) => {
            return note.parentID === null ?
              <ConnectedNoteWithChildren key={note.Id} noteId={note.Id}  />
              : null;
          })}
        </List>
      </div>
    );
  }

  componentWillMount() {
    const localStorageAccessor: LocalStorageAccessor = new LocalStorageAccessor();
    localStorageAccessor.mapLocalStorageItemsToReduxState(store);
  }
}

const mapStateToProps = (state: IGlobalReduxState) => ({
  notes: state.notes
})


export default connect<any, any, any>(mapStateToProps)(MainList);