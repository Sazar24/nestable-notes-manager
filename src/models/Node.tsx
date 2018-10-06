import { v1 } from "uuid";

export interface INode {
  header: string;
  description: string;
  isDone: boolean;
  Id: string;
  parentID: string | null;
  // newEmpty(Id: String) :INode;
}

export class Node implements INode {

  static headerDefaultText: string = "New node";
  static descriptionDefaultText: string = "Click me, to edit.";

  static newEmpty(Id: string, parentID?: string | null): INode {
    if (parentID) {
      const nodeWithIdAndParent = new Node(this.headerDefaultText, this.descriptionDefaultText, false, Id);
      nodeWithIdAndParent.parentID = parentID;
      return nodeWithIdAndParent;
    }
    else
      return new Node(this.headerDefaultText, this.descriptionDefaultText, false, Id);
  }

  static newNode(header: string, description: string, Id: string, parentID: string | null): INode {
    const nodeWithContent = new Node(header, description, false, Id);
    nodeWithContent.parentID = parentID;
    return nodeWithContent;
  };

  public parentID: string | null = null;

  constructor(public header: string, public description: string, public isDone: boolean, public Id: string) {
    this.header = header;
    this.description = description;
    this.isDone = isDone;
    this.Id = Id;
  }
}
