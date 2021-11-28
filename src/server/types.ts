export interface HTTPServer {
  listen: (port: number, callback?: () => void) => void;
  getQuery: (url: string) => { [key: string]: string } | undefined;
}
