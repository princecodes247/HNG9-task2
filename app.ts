/**
 * Module dependencies.
 */
import express, { Express, Request, Response } from "express";
import compression from "compression";

import dotenv from "dotenv";
import cors from "cors";
import { solve } from "./services/solve.service";
import predictOperation from "./services/openai.service";
import { Operation } from "./interfaces";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config({ path: ".env" });

/**
 * Create Express server.
 */
const app = express();

/**
 * Express configuration.
 */
app.set("port", process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.use(
  cors({
    origin: "*",
  })
);
app.use(compression());
app.use(express.json());

const slackUsername = "princecodes247";

app.get("/", (_, res: Response) => {
  res.send("Hello World");
});

app.post("/compute", async (req: Request, res: Response) => {
  let { x, y, operation_type } = req.body;

  if (
    ![
      Operation.ADDITION,
      Operation.MULTIPLICATION,
      Operation.SUBTRACTION,
    ].includes(operation_type.toString().toLowerCase())
  ) {
    console.log("predicting");
    const prediction = await predictOperation(operation_type);
    const predictionArray = prediction.split(",");

    operation_type = predictionArray[0]?.trim();
    if (predictionArray.length > 1) {
      const result = predictionArray[1]?.trim();
      res.json({
        slackUsername,
        result,
        operation_type,
      });
      return res;
    }
  }
  x = parseInt(x) || 0;
  y = parseInt(y) || 0;
  console.log("solving");

  const result = solve(x, y, operation_type);
  res.json({ slackUsername, ...result });
});

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(
    `App is running on http://localhost:${app.get("port")} in ${app.get(
      "env"
    )} mode`
  );
  console.log("Press CTRL-C to stop");
});

module.exports = app;
