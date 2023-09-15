export function getRouteName(route, base = "/") {
    const name = route === null || route === void 0 ? void 0 : route.replace(/(.*)\//, "").replace(/\.ts$/, "");
    return base.endsWith("/") ? base + name : `${base}/${name}`;
}
export function parseToken(ctx) {
    const { header, cookies } = ctx;
    const token = cookies.get("token");
    if (token)
        return token;
    else {
        const { authorization = "" } = header || {};
        const [prefix, token] = authorization.split(" ");
        if (/^Bearer$/i.test(prefix)) {
            return token;
        }
    }
}
