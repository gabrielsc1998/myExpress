import httpServer, { Server } from "http";

import log from "../log";

import * as Types from "./types";

class HTTPServer implements Types.HTTPServer {
  private server?: Server = undefined;

  private requestListener?: Types.RequestListener = undefined;

  listen = (port = 8888, callback?: () => void): void => {
    try {
      if (this.createServer()) {
        this.server?.listen(port);
        if (callback) {
          callback();
        }
      } else {
        throw new Error("Problem to start the server!");
      }
    } catch (error) {
      log.error("HTTPServer", "listen", error);
    }
  };

  setRequestListener = (requestListener: Types.RequestListener): void => {
    this.requestListener = requestListener;
  };

  private createServer = (): boolean | undefined => {
    try {
      this.server = httpServer.createServer(this.requestListener);
      if (this.server) {
        return true;
      }
    } catch (error) {
      log.error("HTTPServer", "createServer", error);
    }
    return undefined;
  };

  // private requestListener = (
  //   req: IncomingMessage,
  //   res: ServerResponse
  // ): void => {
  //   const { url = "" } = req;
  //   const queries = this.getQuery(url);
  //   res.end(`${url} ${JSON.stringify(queries)}`);
  // };

  // private getParams = (url: string): { [key: string]: string | number } => {

  // }

  getQuery = (url: string): { [key: string]: string } | undefined => {
    try {
      if (url.length) {
        const objQueries: { [key: string]: string } = {};
        const arrayUrl = url.split("");

        const hasQueryPattern = (char: string): boolean =>
          char === "?" || char === "&";

        const getValueQuery = (parsedUrl: string): string => {
          let idxNewQuery = parsedUrl.indexOf("&");
          if (idxNewQuery === -1) {
            idxNewQuery = parsedUrl.indexOf("?");
          }
          const idxBar = parsedUrl.indexOf("/");
          if (idxNewQuery !== -1 || idxBar !== -1) {
            if (idxNewQuery !== -1) {
              if (idxBar !== -1 && idxBar < idxNewQuery) {
                return parsedUrl.substring(0, idxBar);
              }
              return parsedUrl.substring(0, idxNewQuery);
            }
            return parsedUrl.substring(0, idxBar);
          }
          if (parsedUrl.length !== 0) {
            return parsedUrl;
          }
          return "";
        };

        if (arrayUrl.some((char) => hasQueryPattern(char))) {
          arrayUrl.forEach((char, index) => {
            if (hasQueryPattern(char)) {
              const parsedUrl = url.substring(index + 1);
              const idxEqual = parsedUrl.indexOf("=");
              const keyQuery = parsedUrl.substring(0, idxEqual);
              const valueQuery = getValueQuery(
                parsedUrl.substring(idxEqual + 1)
              );

              objQueries[keyQuery] = valueQuery;
            }
          });
        }
        return objQueries;
      }
    } catch (error) {
      log.error("HTTPServer", "getQuery", error);
    }
    return undefined;
  };
}

export * from "http";
export default new HTTPServer();
