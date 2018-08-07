import { INode } from "../models/Node";
import { v1 } from "uuid";
import { SingleNode } from "../models/Node";

export enum ActionTypes {
  ADD_ITEM = "ADD NEW ITEM TO LIST",
  ADD_NODE = "ADD NODE TO NODES-LIST",
  ADD_NODE_WITH_NO_PARENT = "ADD NODE WITHOUT PARENT",
}

interface ICreateNewNodeAction {
  type: ActionTypes.ADD_NODE;
  payload: {
    node: INode;
    parentID: string;
  };
}

interface ICreateNewNodeWithoutParentAction {
  type: ActionTypes.ADD_NODE_WITH_NO_PARENT,
  payload: {
    node: INode;
  }
}

export function CreateNewNodeAsChild(newNodeId: string, parentID: string): ICreateNewNodeAction {
  return {
    type: ActionTypes.ADD_NODE,
    payload: {
      node: new SingleNode("header", "descr", false, newNodeId),
      parentID,
    }
  }
};


// export function CreateNewNodeWithoutParent(newNodeId:string, header, description) :ICreateNewNodeWithoutParent{
export function CreateNewNodeWithoutParent(newNodeId: string): ICreateNewNodeWithoutParentAction {
  return {
    type: ActionTypes.ADD_NODE_WITH_NO_PARENT,
    payload: {
      node: new SingleNode("newBranch - header ", "newBranch - description", false, newNodeId),
      // node: new SingleNode(header, descr, false, newNodeId),
    }
  }
}
export type Action = ICreateNewNodeAction | ICreateNewNodeWithoutParentAction;
