import * as React from "react";
import { connect } from "react-redux";
import { Note } from "../../models/Note";
import { List, Button, Icon } from "semantic-ui-react";
import NotesManager from "../../services/NotesManager";
import NewNoteButton from "./NewNoteButton";
import NoteContentWithoutChildren from "./NoteContentWithoutChildren";
import { IGlobalReduxState } from "../../reducers/index";
import Toolbar from "./Toolbar";
import MyChildrenOrSpacer from "./ChildrenOrSpacer";
import { colorOfDepth } from "../../models/colorsByDeepLvl";


export interface IProps {
  noteId: string;
  note: Note;
  childrenIDs: string[];
  colorOfDeepLevel: colorOfDepth;
}

interface IState {
  bgcolor: string;
  showChildren: boolean;
}

export class NoteWithChildren extends React.Component<IProps, IState> {
  private selectedOnColor: string = "#08e8ff";
  private selectedOffColor: string = "silver";

  constructor(props: any) {
    super(props);
    this.state = {
      bgcolor: this.selectedOffColor,
      showChildren: true
    }
  }

  // changeBackgroundColor(isToggled: boolean) {
  //   if (isToggled)
  //     this.setState({ bgcolor: this.selectedOnColor })
  //   else
  //     this.setState({ bgcolor: this.selectedOffColor });
  // }

  toggleSelected() {
    const { showChildren } = this.state;
    this.setState({
      showChildren: !showChildren,
    });
  }

  handleClick = () => {
    this.toggleSelected();
  }

  render(): any {
    const { note, noteId, colorOfDeepLevel, childrenIDs } = this.props;
    const { showChildren } = this.state;
    const iHaveKids: boolean = (childrenIDs.length > 0) ? true : false;

    if (note === undefined) {
      throw new Error("passed undefined {note} to NoteFrame");
    }

    return (
      <List.Item style={{
        // backgroundColor: this.state.bgcolor,
        backgroundColor: colorOfDeepLevel,
        minWidth: "90%",
        padding: "0 0 0 8px",
        border: "2px solid black",
        marginBottom: "2px",
        display: "inherit",
      }} >
        <div style={{ display: "inline-flex", width: "100%" }} >
          {iHaveKids && <Icon
            onClick={this.handleClick}
            name={(showChildren) ? "caret right" : "caret down"} />
          }
          <NoteContentWithoutChildren note={note} />
          <Toolbar note={note} />
        </div>

        <MyChildrenOrSpacer noteId={noteId} showChildren={showChildren} />
      </List.Item>
    );
  }
}

const mapStateToProps = (state: IGlobalReduxState, ownProps: IProps) => ({
  note: new NotesManager().findNote(ownProps.noteId, state.notes),
  childrenIDs: new NotesManager().findChildrensIds(ownProps.noteId, state.notes),
  colorOfDeepLevel: new NotesManager().getColorOfDeepLevel(ownProps.noteId, state.notes)
})

const ConnectedNoteWithChildren = connect<any, any, any>(mapStateToProps)(NoteWithChildren);
export default ConnectedNoteWithChildren;