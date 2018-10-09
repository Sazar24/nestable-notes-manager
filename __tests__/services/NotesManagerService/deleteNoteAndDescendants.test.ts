import { INote } from './../../../src/models/Note';
import NotesManager from '../../../src/services/NotesManager';
import { Note } from '../../../src/models/Note';

describe('proof array.includes(...)', () => {
    it('arrays .includes method is not natively supported by TS (to use this, object must be declared as "any") ', () => {
        const someArray: any = [11, 52, 56, 88];
        let result: boolean;

        result = someArray.includes(11);
        expect(result).toBe(true);

        result = someArray.includes("fooobar");
        expect(result).toBe(false);
    });

    it("filtering out entire (small) array from another (bigger) array", () => {
        const smallArray: number[] = [11, 22, 33];
        const bigArray: number[] = [11, 22, 33, 44, 55, 66, 77, 88];

        const result: number[] = bigArray.filter(item => {
            if (smallArray.indexOf(item) === -1)
                return true;
            else return false;
        });
        const expectedResult = [44, 55, 66, 77, 88];
        expect(result).toEqual(expectedResult);
    });
});

describe.skip('pushing to function argument changes that argument', () => {
    const notesManager = new NotesManager();
    it('should work, as expected... ', () => {
        const arrayBefore = [1,2,3,4];
        const arrayAfterExpected = [1,2,3,4,999];

        notesManager.proofPush(arrayBefore, 999);
        console.log("changed array: ", JSON.stringify(arrayBefore));

        expect(arrayBefore).toEqual(arrayAfterExpected);
    });

});

describe('NotesManager .deleteNoteAndDescendants ', () => {
    const notesManager = new NotesManager();

    it('should delete proper values', () => {
        let notesInState: INote[] = [
            Note.newEmpty("1", null),
            Note.newEmpty("22", "1"),
            Note.newEmpty("33", "1"),
            Note.newEmpty("2", null),
        ];

        const expectedResult: INote[] = [
            Note.newEmpty("2", null),
        ];

        const result: INote[] = notesManager.deleteNoteAndDescendants("1", notesInState);

        expect(result).toEqual(expectedResult);
    });


});