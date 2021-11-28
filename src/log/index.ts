class Log {
  error = (module = "", func = "", error: unknown): void => {
    console.error(` ## [${module}] ${func} - ${error}`);
  };
}

export default new Log();
