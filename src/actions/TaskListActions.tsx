import { INode } from "../models/Task";
import { v1 } from 'uuid';
import { SingleNode } from '../models/Task';

export enum ActionTypes {
    ADD_ITEM = "ADD NEW ITEM TO LIST",
    ADD_NODE = "ADD NODE TO NODES-LIST"
}

interface IAddNodeAction {
    type: ActionTypes.ADD_ITEM,
    payload: { taskItem: INode }
}

interface ICreateNewNodeAction {
    type: ActionTypes.ADD_NODE,
    payload: {
        node: INode,
        parentID: string
    }
}

// export function AddTask(header: string, description: string): IAddTaskAction {
export function AddTask(): IAddNodeAction {
    return {
        type: ActionTypes.ADD_ITEM,
        payload: {
            taskItem: new SingleNode("header", "description", false)
        }
    }
}

export function AddNewNodeWithParentID(parentID: string): ICreateNewNodeAction {
    return {
        type: ActionTypes.ADD_NODE,
        payload: {
            node: new SingleNode("newly created node", "foobar descript.", true),
            parentID,
        }
    }

}


export type Action = IAddNodeAction | ICreateNewNodeAction;
