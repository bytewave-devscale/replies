import { Router } from "express";
import * as replyController from "../controllers/reply.controller";
import authMiddleware from "../middlewares/auth.middleware";

const replyRouter = Router();

replyRouter.get("/", replyController.handleGetReplies);
replyRouter.get("/:replyId", replyController.handleGetReply);
replyRouter.post("/", authMiddleware, replyController.handleCreateReply);
replyRouter.patch("/:replyId", replyController.handleUpdateReply);
replyRouter.delete("/:replyId", replyController.handleDeleteReply);

export default replyRouter;
