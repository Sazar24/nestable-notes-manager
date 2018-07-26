import { INode } from "../models/Task";
import { v1 } from 'uuid';
import { SingleNode } from '../models/Task';

export enum ActionTypes {
    ADD_ITEM = "ADD NEW ITEM TO LIST",
    ADD_NODE = "ADD NODE TO NODES-LIST"
}

interface IAddTaskAction {
    type: ActionTypes.ADD_ITEM,
    payload: { taskItem: INode }
}

// export function AddTask(header: string, description: string): IAddTaskAction {
export function AddTask(): IAddTaskAction {
    return {
        type: ActionTypes.ADD_ITEM,
        payload: {
            taskItem: new SingleNode("header", "description", false)
        }
    }
}

interface ICreateNewNode {
    type: ActionTypes.ADD_NODE,
    payload: {
        node: INode,
        parentID: string
    }
}

export function CreateNewNode(parentID: string): ICreateNewNode {
    return {
        type: ActionTypes.ADD_NODE,
        payload: {
            node: new SingleNode("newly created node", "foobar descript.", true),
            parentID,
        }
    }

}

// need sth to push child ID to  parents' childersID array

export type Action = IAddTaskAction | ICreateNewNode;
