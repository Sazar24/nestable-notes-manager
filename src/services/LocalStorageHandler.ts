import { INode, SingleNode } from './../models/Node';
import { ICreateNewNodeAction, AddLoadedNode } from '../actions/TaskListActions';
import store from '../store/store';

interface IStorageHandler {
    keys: string[];
    // mapLocalStorageItemsToReduxState: (dispatchNodeToReduxState: any) => void;
}


class LocalStorageHandler implements IStorageHandler {
    keys: string[] = [];

    setLastAccessDateTime() {
        localStorage.setItem("LastAccessDateTime", JSON.stringify(new Date()));
    }

    setNodeInLocalStorage(node: INode) {
        if (!this.isSupported()) return;
        localStorage.setItem(node.Id, JSON.stringify(node));
        // this.setLastAccessDateTime();
    }

    extractKeys() {
        this.keys = [];
        for (let i: number = 0; i < localStorage.length; i++) {
            // const keyInStorage: string = JSON.stringify(localStorage.key(i));
            const keyInStorage: string | null = localStorage.key(i);
            if (keyInStorage !== null)
                this.keys.push(keyInStorage);
        }
    }

    getItemAsString(key: string): string {
        const extractedItem: string | null = localStorage.getItem(key)
        if (extractedItem !== null)
            return extractedItem;
        else return "null";   // TODO: find sth to replace that abomination...
    }

    getNode(key: string): INode {
        const extractedNode: INode = JSON.parse(this.getItemAsString(key));
        if (extractedNode === null) {
            throw new Error("in localStorage there is null assigned to key-value, instead of Node-Object");
        }
        console.log({ extractedNode });
        return extractedNode;
    }

    mapLocalStorageItemsToReduxState() {
        if (!this.isSupported()) return;

        console.log("Attempt to extract from localStorage");
        try {
            this.extractKeys();
        } catch (e) {
            throw new Error("extracting keys from local storage has failed")
        }
        console.log("extracted keys: ", this.keys);

        // const extractedNode: INode = this.getNode(this.keys[0]);
        this.keys.map(extractedKey => {
            const extractedNode: INode = this.getNode(extractedKey);
            //     // dispatchNodeToReduxState(extractedNode);
            //     // dispatchNodeToReduxState(extractedNode);
            store.dispatch(AddLoadedNode(extractedNode));
        })
    }

    isSupported(): boolean {  // Jest tests does not support localStorage so it is necessary.
        // source: https://gist.github.com/CodeiSir/1fb8bd9154dfde7eb0c7
        try {
            const itemBackup = localStorage.getItem("")
            // localStorage.removeItem("");
            // localStorage.setItem("", JSON.stringify(itemBackup));
            // if (itemBackup === null) localStorage.removeItem("")
            // else localStorage.setItem("", itemBackup)
            return true;
        } catch (e) {
            return false;
        }
    }
}

export default new LocalStorageHandler();