import { TableInterface, RobotInterface } from '../interfaces';

import ActionInterface from './action_interface';

export default class ReportPosition implements ActionInterface {
  table: TableInterface;
  robot: RobotInterface;

  constructor(table: TableInterface, robot: RobotInterface) {
    this.robot = robot;
  }

  run(): RobotInterface {
    if (!this.robot) {
      throw new Error(
        'The first valid command to the robot is a PLACE command'
      );
    }
    console.log(`OUTPUT: ${this.robot}`);
    return this.robot;
  }
}
