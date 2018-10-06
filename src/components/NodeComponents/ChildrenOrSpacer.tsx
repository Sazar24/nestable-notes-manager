import * as React from 'react';
import { connect } from 'react-redux'
import ConnectedNodeWithChildren from './NodeWithChildren';
import { List } from 'semantic-ui-react';
import { IGlobalReduxState } from '../../reducers';
import NodesManager from '../../services/NodesManager';

export interface IChildrenNodesOrSpacerProps {
    childrenIDs: string[];
    nodeId: string;
    showChildren: boolean;
}

class MyChildrenOrSpacer extends React.Component<IChildrenNodesOrSpacerProps> {
    constructor(props: IChildrenNodesOrSpacerProps) {
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
                                <ConnectedNodeWithChildren nodeId={id} />
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
        // if (showChildren) return (
        //     <List>
        //         {childrenIDs.map(id => {
        //             return (
        //                 <List.Item key={id}>
        //                     <ConnectedNodeWithChildren nodeId={id} />
        //                 </List.Item>
        //             );
        //         })}
        //     </List>
        // )
        // else
        //     if (iHaveKids)
        //         return (<div> ... </div>)
        // return <div>....!!...</div>;
    };
};

const mapState2Props = (state: IGlobalReduxState, ownProps: IChildrenNodesOrSpacerProps) => ({
    childrenIDs: new NodesManager().findChildrensIds(ownProps.nodeId, state.nodes)
});

export default connect<any, any, any>(mapState2Props)(MyChildrenOrSpacer);
