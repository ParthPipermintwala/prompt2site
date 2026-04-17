import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.disable("x-powered-by");

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true, //allowing cookies to be sent with requests from the frontend
  }),
);
app.use(cookieParser());
app.use(express.json());

//Routing
app.use("/api/auth", authRoutes);

//global error handling middleware
app.use((err, req, res, next) => {
   res.status(err.status || 500).json({ message: "something went wrong" });
});
export default app;
