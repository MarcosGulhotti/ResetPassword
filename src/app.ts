import "reflect-metadata";
import express, { Express } from "express";
import { router } from "./routes";
import "./database";

const app: Express = express();

app.use(express.json());
app.use(router);

export default app;
