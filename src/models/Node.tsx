import { v1 } from "uuid";

export interface INode {
  header: string;
  description: string;
  isDone: boolean;
  Id: string;
  parentID: string | null;
}

export class SingleNode implements INode {
  // public Id = v1();
  public parentID = null;

  constructor(public header: string, public description: string, public isDone: boolean, public Id: string ) {
    this.header = header;
    this.description = description;
    this.isDone = isDone;
    this.Id = Id;
  }
}
