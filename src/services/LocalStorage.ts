import { INote, Note } from '../models/Note';
import { AddLoadedNote, loadAllNotes } from '../actions/NotesActions';
import { Store } from 'redux';

interface IStorageHandler {
    setLastAccessDateTime(): void;
    saveAllNotesInStorage(allNotes: INote[]): void;
    loadStorageItemsToReduxState(reduxStore: Store): void;
    isItFirstUse(): boolean;
    loadHelloData(helloNotes: Note[], reduxStore: Store): void;
}

class LocalStorageAccessor implements IStorageHandler { // TODO: test me!
    private allNotesKey: string = "allNotes";
    private LastAccessDateTimeKey: string = "LastAccessDateTime";

    public isItFirstUse(): boolean {
        const areThereAnyNotes: string | null = localStorage.getItem(this.allNotesKey);
        const anyAccessTimeSaved: string | null = localStorage.getItem(this.LastAccessDateTimeKey);

        // console.log(`retrieved ${this.LastAccessDateTimeKey}: ${JSON.stringify(anyAccessTimeSaved)}`);
        if (anyAccessTimeSaved === null && anyAccessTimeSaved === null) return true;
        else return false;
    }

    public loadHelloData(helloNotes: Note[], reduxStore: Store) {
        helloNotes.map(note => {
            reduxStore.dispatch(AddLoadedNote(note));
            console.log(note);
        });
    };

    public setLastAccessDateTime(): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.setItem(this.LastAccessDateTimeKey, JSON.stringify(new Date()));
    };

    public saveAllNotesInStorage(allNotes: INote[]): void {
        if (!this.isLocalStorageSupported()) return;
        localStorage.setItem(this.allNotesKey, JSON.stringify(allNotes));
        this.setLastAccessDateTime();
    };

    public loadStorageItemsToReduxState(reduxStore: Store): void {
        if (!this.isLocalStorageSupported()) return;

        let retrievedNotes: INote[];
        const retrievedData: string | null = localStorage.getItem(this.allNotesKey);
        if (!retrievedData) return;
        else retrievedNotes = JSON.parse(retrievedData);

        reduxStore.dispatch(loadAllNotes(retrievedNotes));
    }

    private isLocalStorageSupported(): boolean {  // Jest tests does not support localStorage so it is necessary.
        try {
            const itemBackup = localStorage.getItem("");
            return true;
        } catch (e) {
            return false;
        };
    };
}

export default LocalStorageAccessor;