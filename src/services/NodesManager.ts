import { IGlobalReduxState } from '../reducers/index';
import { INodesListReducer } from '../reducers/nodeList';

interface IFindingNodesChildren {
    findChildrensIds(IdOfParentNode: string, reduxState: IGlobalReduxState): string[];
    isAlreadyInState(nodeId: string, state: INodesListReducer): boolean;
    findAllDescendantsIds(nodeId: string, reduxState: IGlobalReduxState): string[];
}

export default class NodesManager implements IFindingNodesChildren {

    findChildrensIds(IdOfParentNode: string, reduxState: IGlobalReduxState): string[] {

        const childrenIDs: string[] = [];
        Object.keys(reduxState.nodes).map((nodeID) => {
            const probedNode = reduxState.nodes[nodeID];
            if (probedNode.parentID === IdOfParentNode) {
                childrenIDs.push(probedNode.Id);
            }
        })
        return childrenIDs;
    }

    isAlreadyInState(nodeId: string, state: INodesListReducer): boolean {
        if (typeof (state[nodeId]) === "undefined" || typeof (state[nodeId]) === undefined) return false;
        else return true;
    }

    findAllDescendantsIds(ancestorNodeId: string, reduxState: IGlobalReduxState): string[] { // TODO: test me!
        // zrob tablicę z dzieciakami. - descendatsAwaitingForChecking
        // Sprawdz każdego dzieciaka z tablicy. - potomków (kolejne dzieci) tego dzieciaka wrzuć do descentasAwaitingForChecking
        // Jeśli został sprawdzony, wrzuc go do odzielnej tablicy - descendatsAlreadyChecked . Nie wazne czy mial dzieci czy nie, wazne ze sprawdzony.
        // => descendatsAlreadyChecked => sprawdzaj cały czas pierwszy elementem a potem uzyj array.shift()
        
        const descendatsAwaitingForChecking: string[] =  this.findChildrensIds(ancestorNodeId, reduxState);
        const descendatsAlreadyChecked: string[] = [];

        while (descendatsAwaitingForChecking.length) {
            const probedId = descendatsAwaitingForChecking[0];
            const foundDescendantsWhichNeedToBeCheckedLater: string[] = this.findChildrensIds(probedId, reduxState);

            descendatsAlreadyChecked.push(probedId);
            descendatsAwaitingForChecking.shift();
            descendatsAwaitingForChecking.push(...foundDescendantsWhichNeedToBeCheckedLater);
        }


        return descendatsAlreadyChecked;
    }
}