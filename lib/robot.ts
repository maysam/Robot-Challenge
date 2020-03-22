import { TableInterface } from './table';
import Direction from './directions';

export interface RobotInterface {
  x: number;
  y: number;
  facing: Direction;
  table: TableInterface;
}

export default class Robot implements RobotInterface {
  x: number;
  y: number;
  facing: Direction;
  table: TableInterface;

  constructor(input: RobotInterface) {
    this.x = input.x;
    this.y = input.y;
    this.facing = input.facing;
    this.table = input.table;
  }

  toString(): string {
    return `${this.x},${this.y},${this.facing}`;
  }
}
