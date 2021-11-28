export interface Express {
  listen: (port: number, callback?: () => void) => void;
}
