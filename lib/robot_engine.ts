import Robot from './robot';
import Table from './table';
import { Command } from './commands';
import * as Default from './defaults';

interface Instruction {
  (any): Robot;
}

interface InstructionHash {
  [command: string]: Instruction;
}

export default class RobotEngine {
  table: Table;
  robot: Robot;

  // every state is supposed to replace the current robot state
  instructions: InstructionHash = {
    PLACE: inputs => this.placeRobot(inputs),
    MOVE: () => this.robot.move(),
    LEFT: () => this.robot.turnLeft(),
    RIGHT: () => this.robot.turnRight(),
    REPORT: () => {
      console.log(`OUTPUT: ${this.robot}`);
      return this.robot;
    },
  };

  constructor({ width = Default.Width, height = Default.Height }) {
    this.table = new Table({ width, height });
  }

  execute(command, args): void {
    if (!this.robot && command !== Command.PLACE) {
      throw new Error(
        'The first valid command to the robot is a PLACE command'
      );
    }
    this.robot = this.instructions[Command[command]](args);
  }

  private placeRobot({ x, y, direction }): Robot {
    const newRobot = new Robot({
      x,
      y,
      facing: direction,
      table: this.table,
    });

    // - A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
    // return newRobot;

    if (!this.table.contains(newRobot)) {
      throw new Error('Cannot place robot outside the table');
      // newRobot = null;
      // return newRobot;
    }
    return newRobot;
  }
}
