export enum ActionTypes {
    SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY = "SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY",
    TOGGLE_EDIT_MODE_FOR_GIVEN_ID = "TOGGLE_EDIT_MODE_FOR_GIVEN_ID"
}

interface IPassEditModeToID {
    type: ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
    payload: {
        IdOfEditableNode: string,

    }
}

export function PassEditModeToId(nodeId: string): IPassEditModeToID {
    return {
        type: ActionTypes.SWITCH_EDIT_MODE_TO_GIVEN_ID_ONLY,
        payload: {
            IdOfEditableNode: "nodeId"
        }
    }
}

export type Action = IPassEditModeToID;