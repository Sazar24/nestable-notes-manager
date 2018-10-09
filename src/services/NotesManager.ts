import { Note } from './../models/Note';
import { actionTypes } from '../actions/actionTypes';
import { INote } from '../models/Note';
import { IGlobalReduxState } from '../reducers/index';
import { colorOfDepth } from '../models/colorsByDeepLvl';
import colorsByDeepLvl from '../models/colorsByDeepLvl';

interface INotesManagerService {
    findChildrensIds(IdOfParentNote: string, notesInState: INote[]): string[];
    findAllDescendantsIds(noteId: string, reduxState: INote[]): string[];
    findIndexOfNoteWithGivenId(noteId: string, notesInState: INote[]): number;
    findNote(noteId: string, notesInState: INote[]): INote;
    isDescendingToItself(movingID: string, destinationId: string, reduxState: INote[]): boolean;
    getDeepLevel(note: INote, notesInState: INote[]): number;
    getColorOfDeepLevel(noteId: string, notesInState: INote[]): colorOfDepth;
    deleteNoteAndDescendants(nodeId: string, notesInState: INote[]): INote[];
    toggleBranchStatus(nodeId: string, notesInState: INote[]): void;
}

export default class NotesManager implements INotesManagerService {

    static isAlreadyInState(noteId: string, notesInState: INote[]): boolean {
        if (notesInState.find(item => item.Id === noteId)) {
            return true
        }
        else return false
    }

    findNote(noteId: string, notesInState: INote[]): INote {
        const note = notesInState[this.findIndexOfNoteWithGivenId(noteId, notesInState)];
        return note;
    }

    findIndexOfNoteWithGivenId(noteId: string, notesInState: INote[]): number {
        const foundIndex: number = notesInState.findIndex(note => note.Id === noteId)
        if (foundIndex === -1) throw new Error("note not found in given state. Sth gone wrong :( ");
        return foundIndex;
    }

    findChildrensIds(IdOfParentNote: string, notesInState: INote[]): string[] {
        const childrenIDs: string[] = [];
        notesInState.map(
            (note) => {
                if (note.parentID === IdOfParentNote) {
                    childrenIDs.push(note.Id);
                }
            }
        )
        return childrenIDs;
    }

    findAllDescendantsIds(ancestorNoteId: string, reduxState: INote[]): string[] {
        // zrob tablicę z dzieciakami. - descendatsAwaitingForChecking
        // Sprawdz każdego dzieciaka z tablicy. - potomków (kolejne dzieci) tego dzieciaka wrzuć do descentasAwaitingForChecking
        // Jeśli został sprawdzony, wrzuc go do odzielnej tablicy - descendatsAlreadyChecked . Nie wazne czy mial dzieci czy nie, wazne ze sprawdzony.
        // => descendatsAlreadyChecked => sprawdzaj cały czas pierwszy elementem a potem uzyj array.shift()

        const descendatsAwaitingForChecking: string[] = this.findChildrensIds(ancestorNoteId, reduxState);
        const descendatsAlreadyChecked: string[] = [];

        while (descendatsAwaitingForChecking.length) {
            const probedId = descendatsAwaitingForChecking[0];
            const foundDescendantsWhichNeedToBeCheckedLater: string[] = this.findChildrensIds(probedId, reduxState);

            descendatsAlreadyChecked.push(probedId);
            descendatsAwaitingForChecking.shift();
            descendatsAwaitingForChecking.push(...foundDescendantsWhichNeedToBeCheckedLater);
        }
        return descendatsAlreadyChecked;
    }

    isDescendingToItself(movingID: string, destinationId: string, reduxState: INote[]): boolean {
        let result: boolean = false;
        const myDescendants: string[] = this.findAllDescendantsIds(movingID, reduxState);

        myDescendants.map(descendantID => {
            if (descendantID === destinationId) result = true;
        });

        if (movingID === destinationId) result = true;
        return result;
    }

    getDeepLevel(note: INote, notesInState: INote[]): number {
        let deepLevel: number;
        if (note.parentID === null) {
            deepLevel = 0;
            return deepLevel;
        }

        let ancestor: INote;
        let searchingForParentResult: INote | undefined;

        deepLevel = 0;
        searchingForParentResult = notesInState.find(item => item.Id === note.parentID);

        while (true) {
            if (searchingForParentResult === undefined)
                throw new Error("Line of descendants has been compromised. At least one ancestor of rendered note is no longer exist in state.");
            else {
                deepLevel += 1;
                if (deepLevel === 5000) throw new Error("Sth gone wrong or You keep your notes reeeeeeealy deeply nested. Deep-level reached 5k.")
                ancestor = searchingForParentResult;
            }
            searchingForParentResult = notesInState.find(item => item.Id === ancestor.parentID);

            if (ancestor.parentID === null) return deepLevel;
        };
    };

    getColorOfDeepLevel(noteId: string, notesInState: INote[]): colorOfDepth {
        const noteIndex = this.findIndexOfNoteWithGivenId(noteId, notesInState);
        const note = notesInState[noteIndex];
        const colorsPallete: colorOfDepth[] = colorsByDeepLvl.slice();
        if (note.parentID === null) return colorsPallete[0];
        else colorsPallete.shift();

        const myDeepLevel: number = this.getDeepLevel(note, notesInState);

        // const colorNr = myDeepLevel % colorsByDeepLevel.length;
        const colorNr = myDeepLevel % colorsPallete.length;
        return colorsPallete[colorNr];
    };

    deleteNoteAndDescendants(nodeId: string, notesInState: INote[]): INote[] {
        const notesIdsToErase: string[] = this.findAllDescendantsIds(nodeId, notesInState);
        notesIdsToErase.push(nodeId);

        const result: INote[] = notesInState.filter(note => {
            if (notesIdsToErase.indexOf(note.Id) === -1)
                return true;
            else return false;

        })
        return result;
    };

    toggleBranchStatus(noteId: string, notesInState: INote[]): void {
        let result: INote[] = [];
        const destinationStatus: boolean = !this.findNote(noteId, notesInState).isDone;
        const allDescendantsAndAncestorIds: string[] = this.findAllDescendantsIds(noteId, notesInState);
        allDescendantsAndAncestorIds.push(noteId);

        notesInState.map((item) => {  // TODO: move it to service
            allDescendantsAndAncestorIds.map(descendantID => {
                if (descendantID === item.Id)
                    item.isDone = destinationStatus;
            });
        });
    }

    proofPush(array: number[], arg: number): void {
        array.push(arg);
        // array = [1,4,6,7,913213908];
        console.log("array inside function: ", JSON.stringify(array));
    }
}