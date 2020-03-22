import { RobotInterface } from './robot';

export interface TableInterface {
  width: number;
  height: number;
}

export default class Table implements TableInterface {
  width: number;
  height: number;

  constructor(input: TableInterface) {
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
