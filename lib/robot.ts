import Table from './table';
import { Direction, leftOf, rightOf, movement } from './directions';
const { North, East, South, West } = Direction;

export interface RobotType {
  x: number;
  y: number;
  facing: Direction;
  table: Table;
}

export default class Robot {
  x: number;
  y: number;
  facing: Direction;
  table: Table;

  constructor(input: RobotType) {
    this.x = input.x;
    this.y = input.y;
    this.facing = input.facing;
    this.table = input.table;
  }

  turnLeft() {
    return new Robot({
      x: this.x,
      y: this.y,
      table: this.table,
      facing: leftOf(this.facing),
    });
  }

  turnRight() {
    return new Robot({
      x: this.x,
      y: this.y,
      table: this.table,
      facing: rightOf(this.facing),
    });
  }

  move() {
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

  // move() {
  //   if (this.table) {
  //     console.log(this);
  //     console.log(movement(this.facing, this));
  //     const new_robot = movement(this.facing, this);
  //     if (this.table.contains(new_robot)) {
  //       return new_robot;
  //     }
  //   }
  //   return this;
  // }

  // cloneWith(data) {
  //   return new Robot({
  //     ...this,
  //     ...data,
  //   });
  //   // return new Robot({
  //   //   x: data.x || this.x,
  //   //   y: data.y || this.y,
  //   //   facing: data.facing || this.facing,
  //   //   table: data.table || this.table,
  //   // });
  // }

  toString() {
    return `${this.x},${this.y},${this.facing}`;
  }
}
