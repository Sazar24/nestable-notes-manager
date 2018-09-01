// import * as React from 'react';
// import { connect } from "react-redux";
// import { IState } from '../../reducers';
// import NodeEditMode from './NodeEditMode';
// import ConnectedNodeWithChildren from './connectedComponents/ConnectedNode';
// import OutsideAlerter from './OutsideAlerter';

// interface IProps {
//     nodeId: string;
//     editMode: boolean;
// }

// class NodeWrapper extends React.Component<IProps>{
//     constructor(props: IProps) {
//         super(props);
//     }

//     public render() {
//         const { editMode, nodeId } = this.props;
//         if (editMode === true) {
//             return (
//                 <OutsideAlerter>
//                     < NodeEditMode nodeId={nodeId} />
//                 </OutsideAlerter>
//             )
//         }
//         else
//             return (<ConnectedNodeWithChildren nodeId={nodeId} />)
//     }

// }
// function AmIInEditMode(askingNodeId: string, IdOfEditableNode: string | null): boolean {

//     if (askingNodeId === IdOfEditableNode) { return true }
//     else {
//         return false
//     }
// }

// const mapStateToProps = (state: IState, ownProps: IProps) => ({
//     // editMode: AmIInEditMode(ownProps.nodeId, state.selectedNodes.IdOfEditableNode),
//     editMode: false,
//     // nawet jak dać wszystko na true, to wyświetli tylko pierwsze. Nie wie gdzie wyrenderować kolejne?
//     // Clg z linii 19 wyświetla się tylko raz, nawet jak wszystkie są w editMode==false
// })

// const ConnectedNodeWrapper = connect<any, any, any>(mapStateToProps)(NodeWrapper);
// export default ConnectedNodeWrapper;