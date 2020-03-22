import { TableInterface, RobotInterface } from '../interfaces';
import Robot from '../robot';
import Direction from '../directions';

import ActionInterface from './action_interface';

export default class TurnRight implements ActionInterface {
  table: TableInterface;
  robot: RobotInterface;

  constructor(table: TableInterface, robot: Robot) {
    this.robot = robot;
  }

  run(): RobotInterface {
    if (!this.robot) {
      throw new Error(
        'The first valid command to the robot is a PLACE command'
      );
    }
    return new Robot({
      x: this.robot.x,
      y: this.robot.y,
      table: this.robot.table,
      facing: Direction.rightOf(this.robot.facing),
    });
  }
}
