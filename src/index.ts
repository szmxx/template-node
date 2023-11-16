import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import installRouter from "./routes/index.ts";
import installMiddleware from "./middleware/index.ts";
import "./utils/logger.ts";
import { AppConfig } from "./config/index.ts";
import "dotenv/config";

const app = new Koa();

installMiddleware(app);

app.use(
  cors({
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Disposition", "Content-Length"],
  })
);

app.use(
  koaBody({
    multipart: true,
  })
);

installRouter(app);

app.listen(AppConfig.PORT, () => {
  console.log(`Server running at: http://localhost:${AppConfig.PORT}`);
});
