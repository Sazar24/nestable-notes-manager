import { v1 } from 'uuid';

export interface ITask {
    header: string,
    description: string,
    isDone: boolean,
    ID: string,
    // childrens: string[],
    // parentIT ?: string | null,
}

export class SingleTask implements ITask {
    public ID = v1();
    
    constructor(public header: string, public description: string, public isDone: boolean) {
        this.header = header;
        this.description = description;
        this.isDone = isDone;
    }
    //  header: string;
    //  description: string;
    //  isDone: boolean;
}