import { TableInterface, RobotInterface } from '../interfaces';
import Robot from '../robot';
import Table from '../table';
import Direction from '../directions';

import ActionInterface from './action_interface';

export default class MoveForward implements ActionInterface {
  table: Table;
  robot: Robot;

  constructor(table: TableInterface, robot: Robot) {
    this.table = table as Table;
    this.robot = robot;
  }

  run(): RobotInterface {
    if (!this.robot) {
      throw new Error(
        'The first valid command to the robot is a PLACE command'
      );
    }
    if (this.table) {
      const newRobot = new Robot({
        x: this.robot.x + Direction.movement(this.robot.facing)[0],
        y: this.robot.y + Direction.movement(this.robot.facing)[1],
        table: this.table,
        facing: this.robot.facing,
      });
      if (this.table.contains(newRobot)) {
        return newRobot;
      }
    }
    return this.robot;
  }
}
