import { Schema, model } from "mongoose";
import { ReplyInterface, UpdateReplyInterface } from "../types/entity";

const replySchema = new Schema({
  replyAuthorId: String,
  threadId: String,
  content: String,
});

const replyModel = model("Reply", replySchema);

export async function getReplies(filter: {
  _id?: string;
  replyAuthorId?: string;
  threadId?: string;
}) {
  const replies = await replyModel.find(filter).exec();
  return replies;
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

export async function deleteReply(deleteReplyArgs: {
  replyId: string;
  replyAuthorId: string;
}) {
  const { replyId, replyAuthorId } = deleteReplyArgs;
  const deletedReply = await replyModel.findOneAndDelete({
    _id: replyId,
    replyAuthorId,
  });
  return deletedReply;
}
