import { INode, Node } from '../models/Node';
import { AddLoadedNode } from '../actions/NodesActions';
import { Store } from 'redux';

interface IStorageHandler {
    setLastAccessDateTime(): void;
    saveAllNodesInStorage(allNodes: INode[]): void;
    mapLocalStorageItemsToReduxState(reduxStore: Store): void;
}

class LocalStorageAccessor implements IStorageHandler { // TODO: test me!
    private allNodesKey: string = "allNodes";
    private LastAccessDateTimeKey: string = "LastAccessDateTime";

    public setLastAccessDateTime(): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.setItem(this.LastAccessDateTimeKey, JSON.stringify(new Date()));
    }

    public saveAllNodesInStorage(allNodes: INode[]): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.setItem(this.allNodesKey, JSON.stringify(allNodes));
        this.setLastAccessDateTime();
    }

    public mapLocalStorageItemsToReduxState(reduxStore: Store): void {
        if (!this.isLocalStorageSupported()) return;

        let retrievedNodes: INode[];
        const retrievedData: string | null = localStorage.getItem(this.allNodesKey);
        if (!retrievedData) return;
        else retrievedNodes = JSON.parse(retrievedData);

        retrievedNodes.map(node => {
            reduxStore.dispatch(AddLoadedNode(node));
        })
    }

    private isLocalStorageSupported(): boolean {  // Jest tests does not support localStorage so it is necessary.
        try {
            const itemBackup = localStorage.getItem("")
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default LocalStorageAccessor;