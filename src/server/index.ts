import http from "http";

const host = "localhost";
const port = 8000;

const requestListener = (req: unknown, res: unknown) => {
  console.log(req, res);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
