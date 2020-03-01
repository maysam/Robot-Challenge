import Robot from './robot';

export interface TableType {
  width: number;
  height: number;
}

export default class Table {
  width: number;
  height: number;

  constructor(input: TableType) {
    this.width = input.width;
    this.height = input.height;
  }

  contains(robot: Robot): boolean {
    if (0 <= robot.x && robot.x < this.width) {
      if (0 <= robot.y && robot.y < this.height) {
        return true;
      }
    }
    return false;
  }
}
