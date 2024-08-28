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

export async function updateReply(replyId: string, data: UpdateReplyInterface) {
  updateReplyDataSchema.parse(data);

  const updatedReply = await replyRepository.updateReply(replyId, data);

  if (!updateReply) throw new ReplyNotFoundError("reply not found");

  return updatedReply;
}
