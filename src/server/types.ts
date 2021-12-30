import { IncomingMessage, ServerResponse } from "http";

export interface HTTPServer {
  listen: (port: number, callback?: () => void) => void;
  getQuery: (url: string) => { [key: string]: string } | undefined;
}

export type RequestListener = (
  req: IncomingMessage,
  res: ServerResponse
) => void;

export interface IHTTP_METHODS {
  GET: "GET";
  PUT: "PUT";
  POST: "POST";
  DELETE: "DELETE";
}
