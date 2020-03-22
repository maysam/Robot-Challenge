import Robot, { RobotInterface } from '../robot';
import Table from '../table';
import Direction from '../directions';

import ActionInterface from './action_interface';

export default class PlaceRobot implements ActionInterface {
  x: number;
  y: number;
  facing: Direction;
  robot: RobotInterface;
  table: Table;

  constructor(table: Table, robot: RobotInterface, { x, y, direction }) {
    this.x = x;
    this.y = y;
    this.facing = direction;
    this.table = table;
  }

  run(): RobotInterface {
    const newRobot = new Robot({
      x: this.x,
      y: this.y,
      facing: this.facing,
      table: this.table,
    });

    // - A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
    // return newRobot;

    if (this.table.contains(newRobot)) {
      return newRobot;
    }
    throw new Error('Cannot place robot outside the table');
    // newRobot = null;
    // return newRobot;
  }
}
