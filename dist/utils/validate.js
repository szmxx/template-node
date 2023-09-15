export function validate(schema) {
    return async (ctx, next) => {
        var _a, _b;
        const { body, query } = ctx.request;
        let params = {};
        switch (ctx.method) {
            case "GET":
                params = query;
                break;
            default:
                params = body;
                break;
        }
        const { error } = schema.validate(params, {
            allowUnknown: true,
        });
        if (error) {
            ctx.error({
                msg: (_b = (_a = error === null || error === void 0 ? void 0 : error.details) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message,
            });
        }
        else {
            await next();
        }
    };
}
