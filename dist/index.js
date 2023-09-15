/*
 * @Author: cola
 * @Date: 2023-09-14 13:50:43
 * @LastEditors: cola
 * @Description:
 */
import Koa from "koa";
import { koaBody } from "koa-body";
import cors from "@koa/cors";
import installRouter from "./routes/index";
import installMiddleware from "./middleware/index";
import "./utils/logger";
import "dotenv/config";
const port = 8080;
const app = new Koa();
installMiddleware(app);
app.use(cors({
    credentials: true,
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Disposition", "Content-Length"],
}));
app.use(koaBody({
    multipart: true,
}));
installRouter(app);
app.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`);
});
