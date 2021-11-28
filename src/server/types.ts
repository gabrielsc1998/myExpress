export interface HTTPServer {
  listen: (port: number, callback?: () => void) => void;
}
