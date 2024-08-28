import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`server listens to port:${process.env.PORT}`);
});
