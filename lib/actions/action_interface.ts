import { TableInterface, RobotInterface } from '../interfaces';

export default interface ActionInterface {
  table: TableInterface;
  robot: RobotInterface;
  run(): RobotInterface;
}
