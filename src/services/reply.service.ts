import { ReplyInterface, UpdateReplyInterface } from "../types/entity";
import * as replyRepository from "../repositories/reply.repository";
import { z, ZodError } from "zod";
import { ReplyNotFoundError } from "../types/custom.error";

const replyDataSchema = z
  .object({
    replyAuthorId: z.string(),
    threadId: z.string(),
    content: z.string().min(1),
  })
  .strict();

const updateReplyDataSchema = z
  .object({
    content: z.string().min(1),
  })
  .strict();

export async function getReplies() {
  const replies = await replyRepository.getReplies();
  return replies;
}

export async function getReply(replyId: string) {
  const reply = await replyRepository.getReply(replyId);

  if (!reply) throw new ReplyNotFoundError("reply not found");

  return reply;
}

export async function createReply(data: ReplyInterface) {
  try {
    replyDataSchema.parse(data);
    const newReply = await replyRepository.createReply(data);

    if (!newReply) throw new Error();

    return newReply;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues[0].code);
    }
  }
}

export async function updateReply(updateArgs: {
  replyId: string;
  replyAuthorId: string;
  content: string;
}) {
  const { replyId, replyAuthorId, content } = updateArgs;

  updateReplyDataSchema.parse({ content });

  const updatedReply = await replyRepository.updateReply({
    replyId,
    replyAuthorId,
    content,
  });

  if (!updatedReply) throw new ReplyNotFoundError("reply not found");

  return updatedReply;
}

export async function deleteReply(replyId: string) {
  const deletedReply = await replyRepository.deleteReply(replyId);

  if (!deletedReply) throw new ReplyNotFoundError("reply not found");

  return deletedReply;
}
