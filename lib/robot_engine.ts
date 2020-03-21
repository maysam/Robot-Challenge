import Robot, { IRobot } from './robot';
import Table from './table';
import { Command } from './commands';
import * as Default from './defaults';

interface Instruction {
  (any): Robot;
}

type CommandType = { [key in Command]: any };

interface InstructionHash {
  [command: string]: Instruction;
}

export default class RobotEngine {
  table: Table;
  robot: Robot;

  // every state is supposed to replace the current robot state
  instructions: InstructionHash = {
    PLACE: inputs => this.place_robot(inputs),
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

  execute(command, args) {
    if (!this.robot && command != Command.PLACE) {
      throw 'The first valid command to the robot is a PLACE command';
    }
    this.robot = this.instructions[Command[command]](args);
  }

  private place_robot({ x, y, direction }) {
    const new_robot = new Robot({
      x,
      y,
      facing: direction,
      table: this.table,
    });

    // - A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
    // return new_robot;

    if (!this.table.contains(new_robot)) {
      throw 'Cannot place robot outside the table';
      // new_robot = null;
      // return new_robot;
    }
    return new_robot;
  }
}
