import _pkg from 'winston';
import pkg from 'winston/lib/winston/transports/index.js';
import { inspect } from 'node:util';

const { createLogger, format } = _pkg;
const { Console } = pkg;

function loadWinstonLogger(logger, shardId = 'Gerenciamento') {
  logger
    .add(
      new Console({
        level: 'silly',
        format: format.combine(
          format.timestamp(),
          format.colorize(),
          format.printf((info) => {
            const tags = info.tags?.map((t) => `\x1B[36m${t}\x1B[39m`).join(', ') ?? '';
            const shardPrefix = ` --- [\x1B[36mFragmento ${shardId}\x1B[39m, ${tags}]:`;
            return `${info.timestamp} ${shardPrefix} ${info.message instanceof Error ? inspect(info.message, { depth: 0 }) : info.message}`;
          }),
        ),
      }),
    );
}

function createWinstonLogger(options, client) {
  const logger = createLogger({
    handleExceptions: options?.handleExceptions ?? true,
    handleRejections: options?.handleRejections ?? true,
    exitOnError: false,
  });
  loadWinstonLogger(logger, client?.shard?.ids[0] ?? 'Gerenciamento');

  return logger;
}

export { createWinstonLogger, loadWinstonLogger };
