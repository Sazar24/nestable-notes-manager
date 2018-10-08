import { INote } from '../../../src/models/Note';
import NotesManager from '../../../src/services/NotesManager';


describe("NodesManager.findIndexOfNodeWithGivenId(...) method tests", () => {
    const nodesManager: NotesManager = new NotesManager();

    const nodesInState :INote[] = [
        { header: "top-ancestor", description: "descr", isDone: false, Id: "1", parentID: null },
        { header: "header", description: "descr", isDone: false, Id: "4", parentID: "1" },
        { header: "header", description: "descr", isDone: false, Id: "3", parentID: "1" },
    ]

    it('should return proper index', () => {

        expect(nodesManager.findIndexOfNoteWithGivenId("1", nodesInState)).toBe(0);
        expect(nodesManager.findIndexOfNoteWithGivenId("3", nodesInState)).toBe(2);
        expect(nodesManager.findIndexOfNoteWithGivenId("4", nodesInState)).toBe(1);

    });
})