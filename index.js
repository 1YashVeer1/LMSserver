import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config({});
connectDb();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:8080",
  credentials:true
}))
app.use("/api/v1/user", userRoute);

// app.get("/home", (_, res) => {
//   res.status(200).json({
//     success:true,
//     message:"hello iam coming from backdend"
//   })
// })
app.listen(PORT, () => {
  console.log(`server listen at port ${PORT}`);

})