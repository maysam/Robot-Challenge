import Robot from './robot';
import Table from './table';
import { Command, Actions } from './actions';
import * as Default from './defaults';

export default class RobotEngine {
  table: Table;
  robot: Robot;

  constructor({ width = Default.Width, height = Default.Height }) {
    this.table = new Table({ width, height });
  }

  execute(command: Command, args): void {
    const ActionClass = Actions[command];
    const action = new ActionClass(this.table, this.robot, args);
    this.robot = action.run();
  }
}
