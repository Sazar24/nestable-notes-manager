import { actionTypes } from "./actionTypes";

export interface IAction {
    type: actionTypes,
    payload: {
        IdOfEditableNode?: string | null,
        nodeId? : string | null, 
    }
}

export function PassEditModeToId(nodeId: string | null): IAction {
    return {
        type: actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
        payload: {
            IdOfEditableNode: nodeId
        }
    }
}

export function SelectAndRememberNodeId(nodeId: string): IAction {
  return {
    type: actionTypes.SELECT_AND_REMEMBER_NODEID,
    payload: {
      nodeId
    }
  }
}

// interface IToggleHoghlightNode {
//     type: actionTypes.TOGGLE_HIGHLIGHT,
//     payload: {
//         nodeId: string
//     }
// }

// export function ToggleNodeHighlight(nodeId: string): IToggleHoghlightNode {
//     return {
//         type: actionTypes.TOGGLE_HIGHLIGHT,
//         payload: {
//             nodeId : nodeId
//         }
//     }
// }

export type Action = IAction;