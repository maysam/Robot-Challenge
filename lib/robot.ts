import Table from './table';
import { Direction, leftOf, rightOf, movement } from './directions';

export interface RobotInterface {
  x: number;
  y: number;
  facing: Direction;
  table: Table;
}

export default class Robot implements RobotInterface {
  x: number;
  y: number;
  facing: Direction;
  table: Table;

  constructor(input: RobotInterface) {
    this.x = input.x;
    this.y = input.y;
    this.facing = input.facing;
    this.table = input.table;
  }

  turnLeft(): Robot {
    return new Robot({
      x: this.x,
      y: this.y,
      table: this.table,
      facing: leftOf(this.facing),
    });
  }

  turnRight(): Robot {
    return new Robot({
      x: this.x,
      y: this.y,
      table: this.table,
      facing: rightOf(this.facing),
    });
  }

  move(): Robot {
    if (this.table) {
      const newRobot = new Robot({
        x: this.x + movement(this.facing)[0],
        y: this.y + movement(this.facing)[1],
        table: this.table,
        facing: this.facing,
      });
      if (this.table.contains(newRobot)) {
        return newRobot;
      }
    }
    return this;
  }

  toString(): string {
    return `${this.x},${this.y},${this.facing}`;
  }
}
