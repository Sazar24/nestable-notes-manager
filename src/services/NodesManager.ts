import { actionTypes } from './../actions/actionTypes';
import { INode } from './../models/Node';
import { IGlobalReduxState } from '../reducers/index';
import { colorOfDepth } from '../models/colorsByDeepLvl';
import colorsByDeepLvl from '../models/colorsByDeepLvl';

interface INodesManagerService {
    findChildrensIds(IdOfParentNode: string, nodesInState: INode[]): string[];
    // isAlreadyInState(nodeId: string,  nodesInState: INode[]): boolean;  // i made it static...
    findAllDescendantsIds(nodeId: string, reduxState: INode[]): string[];
    findIndexOfNodeWithGivenId(nodeId: string, nodesInState: INode[]): number;
    findNode(nodeId: string, nodesInState: INode[]): INode;
    isDescendingToItself(movingID: string, destinationId: string, reduxState: INode[]): boolean;
    getDeepLevel(node: INode, nodesInState: INode[]): number;
    getColorOfDeepLevel(nodeId: string, nodesInState: INode[]): colorOfDepth;
}

export default class NodesManager implements INodesManagerService {

    static isAlreadyInState(nodeId: string, nodesInState: INode[]): boolean {
        if (nodesInState.find(item => item.Id === nodeId)) {
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

    isDescendingToItself(movingID: string, destinationId: string, reduxState: INode[]): boolean { // TODO: test me!
        let result: boolean = false;
        const myDescendants: string[] = this.findAllDescendantsIds(movingID, reduxState);

        myDescendants.map(descendantID => {
            if (descendantID === destinationId) result = true;
        });

        if (movingID === destinationId) result = true;
        return result;
    }

    getDeepLevel(node: INode, nodesInState: INode[]): number {
        let deepLevel: number;
        if (node.parentID === null) {
            deepLevel = 0;
            return deepLevel;
        }

        let ancestor: INode;
        let searchingForParentResult: INode | undefined;

        deepLevel = 0;
        searchingForParentResult = nodesInState.find(item => item.Id === node.parentID);

        while (true) {
            if (searchingForParentResult === undefined)
                throw new Error("Line of descendants has been compromised. At least one ancestor of rendered node is no longer exist in state.");
            else {
                deepLevel += 1;
                if (deepLevel === 5000) throw new Error("Sth gone wrong or You keep your nodes reeeeeeealy deeply nested. Deep-level reached 5k.")
                ancestor = searchingForParentResult;
            }
            searchingForParentResult = nodesInState.find(item => item.Id === ancestor.parentID);

            if (ancestor.parentID === null) return deepLevel;
        };
    };

    getColorOfDeepLevel(nodeId: string, nodesInState: INode[]): colorOfDepth {
        const nodeIndex = this.findIndexOfNodeWithGivenId(nodeId, nodesInState);
        const node = nodesInState[nodeIndex];
        const colorsPallete: colorOfDepth[] = colorsByDeepLvl.slice();
        if (node.parentID === null) return colorsPallete[0];
        else colorsPallete.shift();

        const myDeepLevel: number = this.getDeepLevel(node, nodesInState);

        // const colorNr = myDeepLevel % colorsByDeepLevel.length;
        const colorNr = myDeepLevel % colorsPallete.length;
        return colorsPallete[colorNr];
    }
}