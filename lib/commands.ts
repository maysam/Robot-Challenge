import { Direction } from './directions';

export enum Command {
  PLACE,
  MOVE,
  LEFT,
  RIGHT,
  REPORT,
}

export interface CommandInterface {
  command: Command;
  x?: number;
  y?: number;
  direction?: Direction;
}
