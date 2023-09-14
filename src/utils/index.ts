import { Context } from "koa";

export function getRouteName(route: string, base = "/") {
  const name = route.replace(/(.*)\//, "").replace(/\.ts$/, "");
  return base.endsWith("/") ? base + name : `${base}/${name}`;
}

export function parseToken(ctx: Context) {
  const { header, cookies } = ctx;
  const token = cookies.get("token");
  if (token) return token;
  else {
    const { authorization = "" } = header || {};
    const [prefix, token] = authorization.split(" ");
    if (/^Bearer$/i.test(prefix)) {
      return token;
    }
  }
}
