import http, { IncomingMessage } from "http";

const host = "localhost";
const port = 8000;

const requestListener = (req: IncomingMessage): void => {
  // console.log(req, res);
  console.log(req.url);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
