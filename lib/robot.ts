import Table from './table';
import { Direction, leftOf, rightOf, movement } from './directions';
const { North, East, South, West } = Direction;

export interface IRobot {
  x: number;
  y: number;
  facing: Direction;
  table: Table;
}

export default class Robot implements IRobot {
  x: number;
  y: number;
  facing: Direction;
  table: Table;

  constructor(input: IRobot) {
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
      const new_robot = new Robot({
        x: this.x + movement(this.facing)[0],
        y: this.y + movement(this.facing)[1],
        table: this.table,
        facing: this.facing,
      });
      if (this.table.contains(new_robot)) {
        return new_robot;
      }
    }
    return this;
  }

  toString(): string {
    return `${this.x},${this.y},${this.facing}`;
  }
}
