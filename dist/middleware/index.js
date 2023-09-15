import auth from "./auth";
import format from "./format";
const middlewares = [format, auth];
export default async (app) => {
    for (const middleware of middlewares) {
        app.use(middleware);
    }
};
