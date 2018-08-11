import { connect } from 'react-redux';
import { IState } from "../../reducers";
import { IProps, NodeFrame } from "../NodeFrame";

function findMyChildrenIDs(thisID: string, state: IState): string[] {
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
    childrenIDs: findMyChildrenIDs(ownProps.nodeId, state)
})

const ConnectedNodeFrame = connect<any, any, any>(mapStateToProps)(NodeFrame);
export default ConnectedNodeFrame;