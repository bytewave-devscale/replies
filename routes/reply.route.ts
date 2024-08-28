import { Router } from "express";
import * as replyController from "../controllers/reply.controller";

const replyRouter = Router();

replyRouter.get("/", replyController.handleGetReplies);

export default replyRouter;
