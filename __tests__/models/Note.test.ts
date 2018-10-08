import { INote, Note } from '../../src/models/Note';

describe("Note-model constructor proofs: ", () => {
    it('constructor should create new instance of an object ', () => {
        const newNote: INote = new Note("foo", "baz", false, "123");
        const expectedOutput: INote = {
            header: "foo",
            description: "baz",
            isDone: false,
            Id: "123",
            parentID: null
        };
        expect(newNote).toEqual(expectedOutput);
    });

    it('static class method creates the new instance of that class (without calling "new ...()") ', () => {
        const newNote = Note.newEmpty("123");
        const expectedOutput: INote = {
            header: Note.headerDefaultText,
            description: Note.descriptionDefaultText,
            isDone: false,
            Id: "123",
            parentID: null
        };
        expect(newNote).toEqual(expectedOutput);
    });

    it('.newEmpty() static method: if called with second argument it is passed to parentId property', () => {
        const newNote = Note.newEmpty("123", "bababa-baz!");
        const expectedOutput: INote = {
            header: Note.headerDefaultText,
            description: Note.descriptionDefaultText,
            isDone: false,
            Id: "123",
            parentID: "bababa-baz!"
        };
        expect(newNote).toEqual(expectedOutput);
    });
})
