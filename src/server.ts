import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./utils/connectdb";
import replyRouter from "./routes/reply.route";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/reply", replyRouter);

connectDb();

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
