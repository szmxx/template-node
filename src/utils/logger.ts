/*
 * @Author: cola
 * @Date: 2023-09-14 20:42:01
 * @LastEditors: cola
 * @Description:
 */
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "node-service" },
  transports: [
    new winston.transports.File({
      filename: "../logs/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "../logs/combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
export default logger;
