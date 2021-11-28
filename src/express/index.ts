import log from "../log";
import server from "../server";

import * as Types from "./types";

class Express implements Types.Express {
  private server = server;

  listen = (port: number, callback?: () => void): void => {
    try {
      this.server.listen(port, callback);
    } catch (error) {
      log.error("Express", "listen", error);
    }
  };
}

export default new Express();
