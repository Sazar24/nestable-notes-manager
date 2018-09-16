import { INode, Node } from './../../src/models/Node';

describe("Node-model constructor proofs: ", () => {
    it('constructor should create new instance of an object ', () => {
        const newNode: INode = new Node("foo", "baz", false, "123");
        const expectedOutput: INode = {
            header: "foo",
            description: "baz",
            isDone: false,
            Id: "123",
            parentID: null
        };
        expect(newNode).toEqual(expectedOutput);
    });

    it('static class method creates the new instance of that class (without calling "new ...()") ', () => {
        const newNode = Node.newEmpty("123");
        const expectedOutput: INode = {
            header: Node.headerDefaultText,
            description: Node.descriptionDefaultText,
            isDone: false,
            Id: "123",
            parentID: null
        };
        expect(newNode).toEqual(expectedOutput);
    });

    it('.newEmpty() static method: if called with second argument it is passed to parentId property', () => {
        const newNode = Node.newEmpty("123", "bababa-baz!");
        const expectedOutput: INode = {
            header: Node.headerDefaultText,
            description: Node.descriptionDefaultText,
            isDone: false,
            Id: "123",
            parentID: "bababa-baz!"
        };
        expect(newNode).toEqual(expectedOutput);
    });
})
