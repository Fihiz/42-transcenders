export interface if_conversation {
    id: number;
    avatar: string;
    type: string;
    name: string;
    password: string;
    created: Date;
    updated: Date;
    members: Set<string>
  }
  