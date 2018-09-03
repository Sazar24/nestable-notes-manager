import { INode } from "../models/Node";
import { v1 } from "uuid";
import { SingleNode } from "../models/Node";
import { actionTypes } from "./actionTypes";


interface ICreateNewNodeAction {
  type: actionTypes.ADD_NODE;
  payload: {
    node: INode;
    parentID: string;
  };
}

interface ICreateNewNodeWithoutParentAction {
  type: actionTypes.ADD_NODE_WITH_NO_PARENT,
  payload: {
    node: INode;
  }
}

export function CreateNewNodeAsChild(newNodeId: string, parentID: string): ICreateNewNodeAction {
  return {
    type: actionTypes.ADD_NODE,
    payload: {
      node: new SingleNode("new node", "click me, to edit", false, newNodeId),
      parentID,
    }
  }
};


// export function CreateNewNodeWithoutParent(newNodeId:string, header, description) :ICreateNewNodeWithoutParent{
export function CreateNewNodeWithoutParent(newNodeId: string): ICreateNewNodeWithoutParentAction {
  return {
    type: actionTypes.ADD_NODE_WITH_NO_PARENT,
    payload: {
      node: new SingleNode("new node", "To edit - click me.", false, newNodeId),
      // node: new SingleNode(header, descr, false, newNodeId),
    }
  }
}

interface IDeleteNodeWithId {
  type: actionTypes.DELETE_NODE_WITH_GIVEN_ID,
  payload: {
    nodeId: string
  }
}

export function DeleteNodeWithId(nodeId: string): IDeleteNodeWithId {
  return {
    type: actionTypes.DELETE_NODE_WITH_GIVEN_ID,
    payload: {
      nodeId
    }
  }
} // TODO: Test me!

interface IChangeNodeContent {
  type: actionTypes.CHANGE_NODE_CONTENT,
  payload: {
    node: INode
  }
}

export function ChangeNodeContent(node: INode): IChangeNodeContent {
  return {
    type: actionTypes.CHANGE_NODE_CONTENT,
    payload: {
      node
    }
  }
} // TODO: Test me!

export type Action = ICreateNewNodeAction | ICreateNewNodeWithoutParentAction | IDeleteNodeWithId | IChangeNodeContent;
