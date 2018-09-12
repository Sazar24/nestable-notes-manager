import { v1 } from "uuid";

export interface INode {
  header: string;
  description: string;
  isDone: boolean;
  Id: string;
  parentID: string | null;
  // newEmpty(Id: String) :INode;
}

export class SingleNode implements INode {

  static newEmpty(Id: string, parentID?: string | null): INode {
    const headerDefaultText: string = "click me";
    const descriptionDefaultText: string = "to edit.";

    if (parentID) {
      const nodeWithIdAndParent = new SingleNode(headerDefaultText, descriptionDefaultText, false, Id);
      nodeWithIdAndParent.parentID = parentID;
      return nodeWithIdAndParent;
    }
    else
      return new SingleNode(headerDefaultText, descriptionDefaultText, false, Id);
  }

  public parentID: string | null = null;

  constructor(public header: string, public description: string, public isDone: boolean, public Id: string) {
    this.header = header;
    this.description = description;
    this.isDone = isDone;
    this.Id = Id;
  }


  // static newEmpty(Id: string, nr:number):INode {
  //   return new SingleNode("", "", false, Id);
  // }
}
