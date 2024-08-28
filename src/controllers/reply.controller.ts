import { Request, Response } from "express";
import * as replyService from "../services/reply.service";
import { ReplyNotFoundError } from "../types/custom.error";
import { ZodEffects, ZodError } from "zod";

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

export async function handleGetReply(req: Request, res: Response) {
  const replyId = req.params.replyId;

  try {
    const reply = await replyService.getReply(replyId);
    return res.status(200).json({ reply });
  } catch (error) {
    if (error instanceof ReplyNotFoundError) {
      return res.status(404).json({ error: error.message });
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export async function handleCreateReply(req: Request, res: Response) {
  const newReplyData = {
    replyAuthorId: req.body.authData.userId,
    threadId: req.body.threadId,
    content: req.body.content,
  };

  try {
    const newReply = await replyService.createReply(newReplyData);
    return res.status(201).json({ newReply, authData: req.body.authData });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export async function handleUpdateReply(req: Request, res: Response) {
  const replyId = req.params.replyId;

  try {
    const updatedReply = await replyService.updateReply(replyId, req.body);
    return res.status(201).json({ updatedReply });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export async function handleDeleteReply(req: Request, res: Response) {
  const replyId = req.params.replyId;

  try {
    const deletedReply = await replyService.deleteReply(replyId);
    return res.status(201).json({ deletedReply });
  } catch (error) {
    if (error instanceof ReplyNotFoundError) {
      return res.status(400).json({ error: error.message });
    }

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
