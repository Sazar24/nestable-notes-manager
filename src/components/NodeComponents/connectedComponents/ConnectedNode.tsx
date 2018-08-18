import { connect } from 'react-redux';
import { IProps, NodeWithChildren }   from "../NodeWithChildren";
import { IState } from '../../../reducers';

export function findMyChildrenIds(thisID: string, state: IState): string[] {
    const childrenIDs: string[] = [];

    Object.keys(state.nodes).map((nodeID) => {
        const node = state.nodes[nodeID];
        if (node.parentID === thisID) {
            childrenIDs.push(node.Id);
        }
    })
    return childrenIDs;
}

const mapStateToProps = (state: IState, ownProps: IProps) => ({
    node: state.nodes[ownProps.nodeId],
    childrenIDs: findMyChildrenIds(ownProps.nodeId, state)
})

const ConnectedNodeWithChildren = connect<any, any, any>(mapStateToProps)(NodeWithChildren);
export default ConnectedNodeWithChildren;