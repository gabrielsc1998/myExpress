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

  private buildResponseObject = (res: ServerResponse): Types.Response => {
    const send = (data?: unknown): void => {
      // console.log(data);
      res.end(JSON.stringify(data));
    };
    return {
      send,
      status: (status: number) => {
        res.statusCode = status;
        return {
          send,
        };
      },
      setHeader: (key: string, value: string | number | Array<string>) =>
        res.setHeader(key, value),
    };
  };

  private extractBodyFromReq = async (
    req: IncomingMessage
  ): Promise<Types.Request["body"]> =>
    new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk: string) => {
        data += chunk;
      });
      let resp = {};
      req.on("end", () => {
        resp = JSON.parse(data); // 'Buy the milk'
        // console.log(resp);

        return resolve(resp);
      });
    });

  private buildRequestObject = async (
    req: IncomingMessage
  ): Promise<Types.Request> => {
    let body = {};
    if (req?.method !== HTTP_METHODS.GET) {
      body = await this.extractBodyFromReq(req);
    }
    return {
      url: req.url || "",
      method: req.method || "",
      body,
    };
  };

  private requestListener = async (
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void> => {
    const { url = "", method } = req;
    if (url && method) {
      if ((await this.callSomeHandler(method, url, req, res)) !== undefined) {
        return;
      }
    }
    // const queries = this.server.getQuery(url);
    // res.end(`${url} ${JSON.stringify(queries)}`);
    res.statusCode = 404;
    res.end();
  };

  private callSomeHandler = async (
    method: string,
    url: string,
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<number | undefined> => {
    try {
      const idxRoute = this.routes.findIndex(
        (route) => route.method === method && route.path === url
      );
      if (idxRoute !== -1) {
        this.routes[idxRoute].handler(
          await this.buildRequestObject(req),
          this.buildResponseObject(res)
        );
        return idxRoute;
      }
    } catch (error) {
      log.error("Express", "callSomeHandler", error);
    }
    return undefined;
  };
}

export default new Express();
