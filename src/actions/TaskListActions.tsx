import { INode } from "../models/Node";
import { v1 } from "uuid";
import { SingleNode } from "../models/Node";

export enum ActionTypes {
  ADD_ITEM = "ADD NEW ITEM TO LIST",
  ADD_NODE = "ADD NODE TO NODES-LIST"
}

interface IAddNodeAction {
  type: ActionTypes.ADD_ITEM;
  payload: { taskItem: INode };
}

interface ICreateNewNodeAction {
  type: ActionTypes.ADD_NODE;
  payload: {
    node: INode;
    parentID: string;
  };
}

// export function AddTask(header: string, description: string): IAddTaskAction {
export function AddTask(): IAddNodeAction {
  return {
    type: ActionTypes.ADD_ITEM,
    payload: {
      taskItem: new SingleNode("header", "description", false)
    }
  };
}

export function CreateNewNodeWithParentId(
  parentID: string
): ICreateNewNodeAction {
  console.log(`CreateNewNodeWithParentId: ${parentID} has been called!`);
  return {
    type: ActionTypes.ADD_NODE,
    payload: {
      node: new SingleNode("newly created node", "foobar description", true),
      parentID
    }
  };
}

// TODO: będzie(?) też oddzielna funkcja na CreateNode-aleBezParentId (lista główna)

export type Action = IAddNodeAction | ICreateNewNodeAction;
