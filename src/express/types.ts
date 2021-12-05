import { IncomingMessage, ServerResponse } from "../server";

export interface Express {
  listen: (port: number, callback?: () => void) => void;
}

type Request = IncomingMessage;
type Response = ServerResponse;

export type ExpressHandler = (req: Request, res: Response) => void;
