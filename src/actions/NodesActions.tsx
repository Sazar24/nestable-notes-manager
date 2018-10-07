import { INode } from "../models/Node";
import { v1 } from "uuid";
import { Node } from "../models/Node";
import { actionTypes } from "./actionTypes";

// export type Action = {  // TODO: review me....!
//   type: actionTypes;
//   payload: {
//     node: INode;
//     parentId: string;
//     nodeId: string;
//   };
// }

export interface IAction {
  type: actionTypes;
  payload: {
    node?: INode;
    // parentId?: string;
    nodeId?: string;
    movingNodeId?: string,
    destinationParentNodeId?: string,
  };
}

export function CreateNode(newNodeId: string, parentId?: string): IAction {
  return {
    type: actionTypes.CREATE_NODE,
    payload: {
      node: Node.newEmpty(newNodeId, parentId),
    }
  }
}

export function DeleteNode(nodeId: string): IAction {
  return {
    type: actionTypes.DELETE_NODE_WITH_GIVEN_ID,
    payload: {
      nodeId
      // node
    }
  }
}

export function ChangeNodeContent(node: INode): IAction {
  return {
    type: actionTypes.UPDATE_NODE_CONTENT,
    payload: {
      node
    }
  }
}

export function AddLoadedNode(node: INode): IAction {
  return {
    type: actionTypes.ADD_NODE_FROM_MEMORY,
    payload: {
      node
    }
  }
}

export function MoveNodeCloserToAncestor(node: INode): IAction { // TODO: przerobić na (nodeId:string), bo ta akcja nie potrzebuje całego node`a.
  return {
    type: actionTypes.MOVE_CLOSER_TO_ANCESTOR,
    payload: {
      node
    }
  }
}


export function PasteAsChild(movingNodeId: string, destinationParentNodeId: string): IAction {
  return {
    type: actionTypes.ATTACH_REMEMBERED_NODE_TO_PARENT,
    payload: {
      movingNodeId,
      destinationParentNodeId
    }
  }
}