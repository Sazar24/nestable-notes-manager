import { v1 } from "uuid";

export interface INote {
  header: string;
  description: string;
  isDone: boolean;
  Id: string;
  parentID: string | null;
}

export class Note implements INote {

  static headerDefaultText: string = "New note";
  static descriptionDefaultText: string = "Click me, to edit.";

  static newEmpty(Id: string, parentID?: string | null): INote {
    if (parentID) {
      const noteWithIdAndParent = new Note(this.headerDefaultText, this.descriptionDefaultText, false, Id);
      noteWithIdAndParent.parentID = parentID;
      return noteWithIdAndParent;
    }
    else
      return new Note(this.headerDefaultText, this.descriptionDefaultText, false, Id);
  }

  static newNote(header: string, description: string, Id: string, parentID: string | null): INote {
    const noteWithContent = new Note(header, description, false, Id);
    noteWithContent.parentID = parentID;
    return noteWithContent;
  };

  public parentID: string | null = null;

  constructor(public header: string, public description: string, public isDone: boolean, public Id: string) {
    this.header = header;
    this.description = description;
    this.isDone = isDone;
    this.Id = Id;
  }
}
