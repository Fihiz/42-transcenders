export enum convType {
  "public",
  "private",
  "protected"
}

export interface if_conversation {
    id: number;
    avatar: string;
    type: convType;
    name: string;
    password: string;
    members: Array<string>
  }
  