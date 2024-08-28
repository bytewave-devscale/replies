import { Request, Response } from "express";
import * as replyService from "../services/reply.service";

export async function handleGetReplies(_: Request, res: Response) {
  try {
    const replies = await replyService.getReplies();
    return res.status(200).json({ replies });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
