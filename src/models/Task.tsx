import { v1 } from 'uuid';

export interface INode {
    header: string,
    description: string,
    isDone: boolean,
    ID: string,
    childrensID?: string[],
    parentID?: string | null,
}

export class SingleNode implements INode {
    public ID = v1();
    public parentID = null;

    constructor(public header: string, public description: string, public isDone: boolean) {
        this.header = header;
        this.description = description;
        this.isDone = isDone;
    }
    //  header: string;
    //  description: string;
    //  isDone: boolean;
}