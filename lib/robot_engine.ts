import Robot from './robot';
import Table from './table';
import { Command } from './commands';

export default class RobotEngine {
  table: Table;
  robot: Robot;

  constructor({ width = 5, height = 5 }) {
    this.table = new Table({ width, height });
  }

  execute(command, args) {
    if (!this.robot && command != Command.PLACE) {
      throw 'The first valid command to the robot is a PLACE command';
    }
    switch (command) {
      case Command.PLACE:
        this.place_robot(args);
        break;
      case Command.MOVE:
        this.robot = this.robot.move();
        break;
      case Command.LEFT:
        this.robot = this.robot.turnLeft();
        break;
      case Command.RIGHT:
        this.robot = this.robot.turnRight();
        break;
      case Command.REPORT:
        console.log(`OUTPUT: ${this.robot}`);
        break;
    }
  }

  place_robot({ x, y, direction }) {
    const new_robot = new Robot({
      x,
      y,
      facing: direction,
      table: this.table,
    });

    // - A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
    // return new_robot;

    if (this.table.contains(new_robot)) {
      this.robot = new_robot;
    } else {
      throw 'Cannot place robot outside the table';
      // return null;
    }
  }
}
