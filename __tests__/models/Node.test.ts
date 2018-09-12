import { INode, SingleNode } from './../../src/models/Node';

describe("Node-model constructor proofs: ", () => {
    it('constructor should create new instance of an object ', () => {
        const newNode: INode = new SingleNode("foo", "baz", false, "123");
        const expectedOutput = {
            header: "foo",
            description: "baz",
            isDone: false,
            Id: "123",
            parentID: null
        };
    });

    it('static class method creates the new instance of that class (without calling "new ...()") ', () => {
        const newNode = SingleNode.newEmpty("123");
        const expectedOutput = {
            header: "",
            description: "",
            isDone: false,
            Id: "123",
            parentID: null
        };
    });

    it('.newEmpty() static method: if called with second argument it is passed to parentId property', () => {
        const newNode = SingleNode.newEmpty("123", "bababa-baz!");
        const expectedOutput = {
            header: "",
            description: "",
            isDone: false,
            Id: "123",
            parentID: "bababa-baz!"
        };
    });
})
