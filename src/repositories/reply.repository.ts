import { Schema, model } from "mongoose";
import { ReplyInterface, UpdateReplyInterface } from "../types/entity";

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

export async function getReply(replyId: string) {
  const reply = await replyModel.find({ _id: replyId });
  return reply;
}

export async function createReply(data: ReplyInterface) {
  const newReply = await new replyModel(data).save();
  return newReply;
}

export async function updateReply(updateArgs: {
  replyId: string;
  replyAuthorId: string;
  content: string;
}) {
  const { replyId, replyAuthorId, content } = updateArgs;

  const updatedReply = await replyModel.findOneAndUpdate(
    { _id: replyId, replyAuthorId },
    { content },
    { new: true }
  );
  return updatedReply;
}

export async function deleteReply(replyId: string) {
  const deletedReply = await replyModel.findOneAndDelete({ _id: replyId });
  return deletedReply;
}
