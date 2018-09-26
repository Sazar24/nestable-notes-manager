import { INode } from './../models/Node';
import { IGlobalReduxState } from '../reducers/index';

interface INodesManagerService {
    findChildrensIds(IdOfParentNode: string, nodesInState: INode[]): string[];
    // isAlreadyInState(nodeId: string,  nodesInState: INode[]): boolean;
    findAllDescendantsIds(nodeId: string, reduxState: INode[]): string[];
    findIndexOfNodeWithGivenId(nodeId: string, nodesInState: INode[]): number;
    findNode(nodeId: string, nodesInState: INode[]): INode;
}

export default class NodesManager implements INodesManagerService {

    static isAlreadyInState(nodeId: string, nodesInState: INode[]): boolean {
        if (nodesInState.find(item => item.Id === nodeId)) {
            // console.log("possible dubbled node with Id: ", nodeId);
            return true
        }
        else return false
    }

    findNode(nodeId: string, nodesInState: INode[]): INode {
        const node = nodesInState[this.findIndexOfNodeWithGivenId(nodeId, nodesInState)];
        return node;

    }

    findIndexOfNodeWithGivenId(nodeId: string, nodesInState: INode[]): number {
        const foundIndex: number = nodesInState.findIndex(node => node.Id === nodeId)
        if (foundIndex === -1) throw new Error("node not found in given state. Sth gone wrong :( ");

        return foundIndex;
    }

    findChildrensIds(IdOfParentNode: string, nodesInState: INode[]): string[] {
        const childrenIDs: string[] = [];
        nodesInState.map(
            (node) => {
                if (node.parentID === IdOfParentNode) {
                    childrenIDs.push(node.Id);
                }
            }
        )
        return childrenIDs;
    }

    findAllDescendantsIds(ancestorNodeId: string, reduxState: INode[]): string[] {
        // zrob tablicę z dzieciakami. - descendatsAwaitingForChecking
        // Sprawdz każdego dzieciaka z tablicy. - potomków (kolejne dzieci) tego dzieciaka wrzuć do descentasAwaitingForChecking
        // Jeśli został sprawdzony, wrzuc go do odzielnej tablicy - descendatsAlreadyChecked . Nie wazne czy mial dzieci czy nie, wazne ze sprawdzony.
        // => descendatsAlreadyChecked => sprawdzaj cały czas pierwszy elementem a potem uzyj array.shift()

        const descendatsAwaitingForChecking: string[] = this.findChildrensIds(ancestorNodeId, reduxState);
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