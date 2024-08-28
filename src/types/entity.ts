export interface ReplyInterface {
  _id?: string;
  replyAuthorId: string;
  threadId: string;
  content: string;
}

export interface UpdateReplyInterface {
  content: string;
}
