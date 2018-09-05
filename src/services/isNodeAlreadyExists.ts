import { INodesListReducer } from "../reducers/nodeList";

interface INodeTracker {
    call(nodeId: string, state: INodesListReducer): boolean;
}

export default class IsNodeAlreadyExistsInState implements INodeTracker {

    call(nodeId: string, state: INodesListReducer): boolean {
        if (typeof (state[nodeId]) === "undefined" || typeof (state[nodeId]) === undefined) return false;
        else return true;
    }
}