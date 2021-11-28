import log from "../log";
import { HTTP_METHODS } from "../server/data";
import server, { IncomingMessage, ServerResponse } from "../server";

import * as Types from "./types";

class Express implements Types.Express {
  private server = server;

  private routes: Array<{
    method: string;
    path: string;
  }> = [];

  listen = (port: number, callback?: () => void): void => {
    try {
      this.server.setRequestListener(this.requestListener);
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

  private requestListener = (
    req: IncomingMessage,
    res: ServerResponse
  ): void => {
    const { url = "" } = req;
    const queries = this.server.getQuery(url);
    res.end(`${url} ${JSON.stringify(queries)}`);
  };
}

export default new Express();
