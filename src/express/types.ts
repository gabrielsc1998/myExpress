import /* IncomingMessage, ServerResponse */ "../server";

export interface Express {
  listen: (port: number, callback?: () => void) => void;
}

export type Request = {
  url: string;
  method: string;
  body: {
    [key: string]: string | number | Array<string | number>;
  };
};

export type Response = {
  send: (data?: unknown) => void;
  status: (status: number) => {
    send: (data?: unknown) => void;
  };
  setHeader: (key: string, value: string | number | Array<string>) => void;
};

export type ExpressHandler = (req: Request, res: Response) => void;
