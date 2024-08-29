import { Router } from "express";
import * as replyController from "../controllers/reply.controller";
import authMiddleware from "../middlewares/auth.middleware";

const replyRouter = Router();

replyRouter.get("/", replyController.handleGetReplies);
replyRouter.get("/thread/:threadId", replyController.handleGetReplyByThread);
replyRouter.get(
  "/author/:replyAuthorId",
  replyController.handleGetReplyByAuthor
);
replyRouter.get("/:replyId", replyController.handleGetReply);
replyRouter.post("/", authMiddleware, replyController.handleCreateReply);
replyRouter.patch(
  "/:replyId",
  authMiddleware,
  replyController.handleUpdateReply
);
replyRouter.delete(
  "/:replyId",
  authMiddleware,
  replyController.handleDeleteReply
);

export default replyRouter;
