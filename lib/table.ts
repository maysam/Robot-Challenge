import { RobotInterface } from './robot';

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

  contains(robot: RobotInterface): boolean {
    if (robot.x >= 0 && robot.x < this.width) {
      if (robot.y >= 0 && robot.y < this.height) {
        return true;
      }
    }
    return false;
  }
}
