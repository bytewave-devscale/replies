import { ReplyInterface } from "./../types/entity";
import * as replyRepository from "../repositories/reply.repository";
import { z, ZodError } from "zod";

const replyDataSchema = z
  .object({
    replyAuthorId: z.string(),
    threadId: z.string(),
    content: z.string(),
  })
  .strict();

export async function getReplies() {
  try {
    const replies = await replyRepository.getReplies();
    return replies;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("get all replies failed");
    }
  }
}

export async function createReply(data: ReplyInterface) {
  try {
    replyDataSchema.parse(data);
    const newReply = await replyRepository.createReply(data);
    return newReply;
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.issues[0].message);
    }

    if (error instanceof Error) {
      throw new Error("create reply failed");
    }
  }
}
