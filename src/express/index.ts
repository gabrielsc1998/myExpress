import log from "../log";
import { HTTP_METHODS } from "../server/data";
import server, { IncomingMessage, ServerResponse } from "../server";

import * as Types from "./types";

class Express implements Types.Express {
  private server = server;

  private routes: Array<{
    method: string;
    path: string;
    handler: Types.ExpressHandler;
  }> = [];

  listen = (port: number, callback?: () => void): void => {
    try {
      this.server.setRequestListener(this.requestListener);
      this.server.listen(port, callback);
    } catch (error) {
      log.error("Express", "listen", error);
    }
  };

  get = (route: string, handler: Types.ExpressHandler): void => {
    this.addRoute(route, HTTP_METHODS.GET, handler);
  };

  put = (route: string, handler: Types.ExpressHandler): void => {
    this.addRoute(route, HTTP_METHODS.PUT, handler);
  };

  post = (route: string, handler: Types.ExpressHandler): void => {
    this.addRoute(route, HTTP_METHODS.POST, handler);
  };

  delete = (route: string, handler: Types.ExpressHandler): void => {
    this.addRoute(route, HTTP_METHODS.DELETE, handler);
  };

  private addRoute = (
    path: string,
    method: string,
    handler: Types.ExpressHandler
  ): void => {
    this.routes.push({
      method,
      path,
      handler,
    });
  };

  private requestListener = (
    req: IncomingMessage,
    res: ServerResponse
  ): void => {
    const { url = "", method } = req;
    if (url && method) {
      if (this.callSomeHandler(method, url, req, res) !== undefined) {
        return;
      }
    }
    // const queries = this.server.getQuery(url);
    // res.end(`${url} ${JSON.stringify(queries)}`);
    res.end(`${url}${method}`);
  };

  private callSomeHandler = (
    method: string,
    url: string,
    req: IncomingMessage,
    res: ServerResponse
  ): number | undefined => {
    try {
      const idxRoute = this.routes.findIndex(
        (route) => route.method === method && route.path === url
      );
      if (idxRoute !== -1) {
        this.routes[idxRoute].handler(req, res);
        return idxRoute;
      }
    } catch (error) {
      log.error("Express", "callSomeHandler", error);
    }
    return undefined;
  };
}

export default new Express();
