import mongoose from "mongoose";

export default async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URI as string);
    console.log("connected to db");
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
