import * as React from 'react';
import { connect } from 'react-redux'
import ConnectedNoteWithChildren from './NoteWithChildren';
import { List } from 'semantic-ui-react';
import { IGlobalReduxState } from '../../reducers';
import NotesManager from '../../services/NotesManager';

export interface IChildrenNotesOrSpacerProps {
    childrenIDs: string[];
    noteId: string;
    showChildren: boolean;
}

class MyChildrenOrSpacer extends React.Component<IChildrenNotesOrSpacerProps> {
    constructor(props: IChildrenNotesOrSpacerProps) {
        super(props);
    };

    public render() {
        const { childrenIDs, showChildren } = this.props;
        const iHaveKids: boolean = (childrenIDs.length > 0) ? true : false;

        if (!childrenIDs || childrenIDs.length === 0) {
            return null;
        }

        return (
            <div>
                {showChildren && (<List>
                    {childrenIDs.map(id => {
                        return (
                            <List.Item key={id}>
                                <ConnectedNoteWithChildren noteId={id} />
                            </List.Item>
                        );
                    })}
                </List>
                )}

                {!showChildren && iHaveKids && (
                    <div>...</div>)
                }
            </div >
        )
    };
};

const mapState2Props = (state: IGlobalReduxState, ownProps: IChildrenNotesOrSpacerProps) => ({
    childrenIDs: new NotesManager().findChildrensIds(ownProps.noteId, state.notes)
});

export default connect<any, any, any>(mapState2Props)(MyChildrenOrSpacer);
