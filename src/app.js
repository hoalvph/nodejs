import express from "express";
import dotenv from "dotenv";
import productRouter from "./routers/product.js"
import mongoose from "mongoose";

dotenv.config()


const app = express();
app.use(express.json());

app.use("/api", productRouter);
mongoose.connect("mongodb://127.0.0.1:27017/test")


export const viteNodeApp = app;