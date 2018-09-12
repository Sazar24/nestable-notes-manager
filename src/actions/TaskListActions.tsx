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

// export function CreateNewNodeAsChild(newNodeId: string, parentId: string): IAction {
//   return {
//     type: actionTypes.ADD_NODE,
//     payload: {
//       node: new SingleNode("new node", "click me, to edit", false, newNodeId),
//       // parentId,
//     }
//   }
// };

// export function CreateNewNodeWithoutParent(newNodeId: string): IAction { // TODO: ujednolicić tę funkcję i CreateNewNodeAsChild(...). Rozbicie na Create...AsAChild i ...WithoutParent robi bajzel i jest bez sensu.
//   return {
//     type: actionTypes.ADD_NODE_WITH_NO_PARENT,
//     payload: {
//       node: new SingleNode("new node", "To edit - click me.", false, newNodeId),
//     }
//   }
// }

// export function DeleteNodeWithId(nodeId: string): IAction {
export function DeleteNode(nodeId :string): IAction {
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