const chalk = require('chalk');

const info = (message) => {
  return `${chalk.blueBright(message)}`;
};

const error = (message) => {
  return `${chalk.bgRed(message)}`;
};

const success = (message) => {
  return `${chalk.green(message)}`;
};

const warning = (message) => {
  return `${chalk.yellow(message)} `;
};

const bold = (message) => {
  return `${chalk.bold(message)}`;
};

const getTime = (date = new Date()) => {
  return chalk.gray(
    `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
  );
};

module.exports = { info, error, success, warning, bold, getTime };