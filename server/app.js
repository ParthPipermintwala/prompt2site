import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoute.js";
import websiteRouter from "./routes/websiteRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const app = express();
app.disable("x-powered-by");

const allowedOrigins = (process.env.ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
app.set("trust proxy", 1);
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true, //allowing cookies to be sent with requests from the frontend
  }),
);
app.use(cookieParser());
app.use(express.json());

//Routing
app.use("/api/auth",authRouter);
app.use("/api/user",authMiddleware,userRouter);
app.use("/api/website",websiteRouter);
app.use("/api/payment",authMiddleware,paymentRouter);
//global error handling middleware
app.use((err, req, res, next) => {
   res.status(err.status || 500).json({ message: "something went wrong" });
});

export default app;
