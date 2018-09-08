import { actionTypes } from "./actionTypes";

interface IPassEditModeToID {
    type: actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
    payload: {
        IdOfEditableNode: string | null,

    }
}

export function PassEditModeToId(nodeId: string | null): IPassEditModeToID {
    return {
        type: actionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
        payload: {
            IdOfEditableNode: nodeId
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

export type Action = IPassEditModeToID;