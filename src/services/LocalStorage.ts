import { INode, Node } from '../models/Node';
import { AddLoadedNode } from '../actions/TaskListActions';
import { Store } from 'redux';

interface IStorageHandler {
    setLastAccessDateTime(): void;
    mapLocalStorageItemsToReduxState(store: Store): void;
    setNodeInLocalStorage(node: INode): void;
    removeNodeFromLocalStorage(key: string): void;
    removeChildrenOfParent(parentId: string): void;
}

class LocalStorageAccessor implements IStorageHandler { // TODO: test me!
    private keys: string[] = [];

    public setNodeInLocalStorage(node: INode): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.setItem(node.Id, JSON.stringify(node));
        // this.setLastAccessDateTime();
    }

    public setLastAccessDateTime(): void {
        localStorage.setItem("LastAccessDateTime", JSON.stringify(new Date()));
    }

    public mapLocalStorageItemsToReduxState(store: Store): void {
        if (!this.isLocalStorageSupported()) return;

        this.extractKeys();

        this.keys.map(extractedKey => {
            const extractedNode: INode = this.getNode(extractedKey);
            return store.dispatch(AddLoadedNode(extractedNode)); // store must be a argument. Otherwise, if called directly, there would be redux-type error (" Generic type 'Dispatch<S>' requires 1 type argument(s).")
        })
    }

    public removeNodeFromLocalStorage(key: string): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.removeItem(key);

    }

    public removeChildrenOfParent(parentId: string) {
        // TODO :)   // ta funkcjonalność działa na state`cie, ale wymaga implementacji także na local storage. Chyba, że będę zapisywał od razu cały stan, a nie poszczególne node`y.
    }

    private extractKeys(): void {
        this.keys = [];
        for (let i: number = 0; i < localStorage.length; i++) {
            const keyInStorage: string | null = localStorage.key(i);
            if (keyInStorage !== null)
                this.keys.push(keyInStorage);
        }
    }

    private getItemAsString(key: string): string {
        const extractedItem: string | null = localStorage.getItem(key)
        if (extractedItem !== null)
            return extractedItem;
        else return "null";   // TODO: find sth to replace that abomination...
    }

    private getNode(key: string): INode {
        const extractedNode: INode = JSON.parse(this.getItemAsString(key));
        if (extractedNode === null) {
            throw new Error("in localStorage there is null assigned to key-value, instead of Node-Object");
        }
        return extractedNode;
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

// export default new LocalStorageHandler();
export default LocalStorageAccessor;