import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import studentRouter from "./routers/student.routes"
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(cors());
app.use("/apis/v1/students", studentRouter);

export default app;