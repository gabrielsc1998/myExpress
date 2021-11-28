import log from "../log";
import server from "../server";
import { HTTP_METHODS } from "../server/data";

import * as Types from "./types";

class Express implements Types.Express {
  private server = server;

  private routes: Array<{
    method: string;
    path: string;
  }> = [];

  listen = (port: number, callback?: () => void): void => {
    try {
      this.server.listen(port, callback);
    } catch (error) {
      log.error("Express", "listen", error);
    }
  };

  get = (route: string): void => {
    this.addRoute(route, HTTP_METHODS.GET);
  };

  put = (route: string): void => {
    this.addRoute(route, HTTP_METHODS.PUT);
  };

  post = (route: string): void => {
    this.addRoute(route, HTTP_METHODS.POST);
  };

  delete = (route: string): void => {
    this.addRoute(route, HTTP_METHODS.DELETE);
  };

  private addRoute = (path: string, method: string): void => {
    this.routes.push({
      method,
      path,
    });
  };
}

export default new Express();
