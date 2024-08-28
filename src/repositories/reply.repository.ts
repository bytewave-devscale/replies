import { Schema, model } from "mongoose";
import { ReplyInterface } from "../types/entity";

const replySchema = new Schema({
  replyAuthorId: String,
  threadId: String,
  content: String,
});

const replyModel = model("Reply", replySchema);

export async function getReplies() {
  const replies = await replyModel.find();
  return replies;
}

export async function createReply(data: ReplyInterface) {
  const newReply = await new replyModel(data).save();
  return newReply;
}
