import { INote } from '../../../src/models/Note';
import { IGlobalReduxState } from '../../../src/reducers/index';

import NotesManager from '../../../src/services/NotesManager';

describe("handling NoteManager.findAllDEscendatsIds method:", () => {

    const noteManager = new NotesManager();
    const simulationlState: INote[] = [
        { header: "foobar", description: "baz", isDone: false, Id: "parent1-ancestor", parentID: null },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child1", parentID: "parent1-ancestor" },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child2", parentID: "parent1-ancestor" },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child3", parentID: "parent1-ancestor" },
        { header: "foobar", description: "baz", isDone: false, Id: "parent2-ancestor", parentID: null },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child21", parentID: "parent2-ancestor" },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child22", parentID: "parent2-ancestor" },
          /**/{ header: "foobar", description: "baz", isDone: false, Id: "child23", parentID: "parent2-ancestor" },
          /**//**/ { header: "foobar", description: "baz", isDone: false, Id: "sub-child-1", parentID: "child23" },
          /**//**/ { header: "foobar", description: "baz", isDone: false, Id: "sub-child-2", parentID: "child23" },
          /**//**/ { header: "foobar", description: "baz", isDone: false, Id: "sub-child-3", parentID: "child23" },
          /**//**/ { header: "foobar", description: "baz", isDone: false, Id: "sub-child-4", parentID: "child23" },
        { header: "foobar", description: "baz", isDone: false, Id: "noParentOrChildren1", parentID: null },
        { header: "foobar", description: "baz", isDone: false, Id: "noParentOrChildren2", parentID: null },
    ]

    it('searching return all children (one level deep - children only, no grandChildren (because there is none grand-children) of top ancestor', () => {

        const simulatedOutput: string[] = noteManager.findAllDescendantsIds("parent1-ancestor", simulationlState);
        const expectedOutput: string[] = ["child1", "child2", "child3"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('finding deep nested descendatnts of top ancestor', () => {
        const simulatedOutput: string[] = noteManager.findAllDescendantsIds("parent2-ancestor", simulationlState);
        const expectedOutput: string[] = ["child21", "child22", "child23", "sub-child-1", "sub-child-2", "sub-child-3", "sub-child-4"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('for note with no parent and no children returns empty array', () => {
        const simulatedOutput: string[] = noteManager.findAllDescendantsIds("noParent2", simulationlState);
        const expectedOutput: string[] = [];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

    it('for child, who has its own childs, returns those childs', () => {
        const simulatedOutput: string[] = noteManager.findAllDescendantsIds("child23", simulationlState);
        const expectedOutput: string[] = ["sub-child-1", "sub-child-2", "sub-child-3", "sub-child-4"];

        expect(simulatedOutput).toEqual(expectedOutput);
    });

})