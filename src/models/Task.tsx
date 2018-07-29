import { v1 } from 'uuid';

const NewUUID = v1();

export interface INode {
    header: string,
    description: string,
    isDone: boolean,
    ID: string,
    parentID: string | null,
}

export class SingleNode implements INode {
    public ID = NewUUID;
    public parentID = null;

    constructor(public header: string, public description: string, public isDone: boolean) {
        this.header = header;
        this.description = description;
        this.isDone = isDone;
    }
}