interface IBlock {
  type: string;
  text?: {
    type: string;
    text: string;
  };
  elements?: {
    type: string;
    text: string;
  }[];
}

export interface IMessage {
  channel: string;
  text: string;
  blocks: IBlock[];
}
