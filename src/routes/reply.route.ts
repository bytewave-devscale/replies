import { Router } from "express";
import * as replyController from "../controllers/reply.controller";

const replyRouter = Router();

replyRouter.get("/", replyController.handleGetReplies);
replyRouter.get("/:replyId", replyController.handleGetReply);
replyRouter.post("/", replyController.handleCreateReply);
replyRouter.patch("/:replyId", replyController.handleUpdateReply);

export default replyRouter;
