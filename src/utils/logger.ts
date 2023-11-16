import winston from "winston";
import { join } from "pathe";

const logDir = join(process.cwd(), "logs");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // 添加时间戳
    winston.format.prettyPrint(), // 打印整个日志对象
    winston.format.splat(), // 支持格式化的字符串
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`; // 自定义输出格式
    })
  ),
  defaultMeta: { service: "node-service" },
  transports: [
    new winston.transports.File({
      filename: join(logDir, "./error.log"),
      level: "error",
    }),
    new winston.transports.File({ filename: join(logDir, "combined.log") }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.colorize(),
    })
  );
}

// replaceConsoleWithWinston();

function replaceConsoleWithWinston(): void {
  // 替换所有 console 方法
  console.log = (...msg) =>
    logger.info(`${msg.map((v) => v?.toString?.()).join(" ")}`);
  console.error = (...msg) =>
    logger.error(`${msg.map((v) => v?.toString?.()).join(" ")}`);
  console.warn = (...msg) =>
    logger.warn(`${msg.map((v) => v?.toString?.()).join(" ")}`);
  console.debug = (...msg) =>
    logger.debug(`${msg.map((v) => v?.toString?.()).join(" ")}`);
}
