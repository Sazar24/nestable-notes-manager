import { INode } from "../models/Node";
import { v1 } from "uuid";
import { SingleNode } from "../models/Node";

export enum ActionTypes {
  ADD_ITEM = "ADD NEW ITEM TO LIST",
  ADD_NODE = "ADD NODE TO NODES-LIST"
}

interface ICreateNewNodeAction {
  type: ActionTypes.ADD_NODE;
  payload: {
    node: INode;
    parentID: string;
  };
}

export function CreateNewNodeAsChild(parentID: string, newNodeId: string): ICreateNewNodeAction {
  return {
    type: ActionTypes.ADD_NODE,
    payload: {
      node: new SingleNode("header", "descr", false, newNodeId),
      parentID,
    }
  }
};


// TODO: będzie(?) też oddzielna funkcja na CreateNode-aleBezParentId (lista główna)

// export type Action = IAddNodeAction | ICreateNewNodeAction;
export type Action = ICreateNewNodeAction;
