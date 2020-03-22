import Direction from '../directions';

import PlaceRobot from './place_robot';
import TurnLeft from './turn_left';
import TurnRight from './turn_right';
import MoveForward from './move_forward';
import ReportPosition from './report_position';

export { PlaceRobot, TurnLeft, TurnRight, MoveForward, ReportPosition };

export enum Command {
  PLACE,
  MOVE,
  LEFT,
  RIGHT,
  REPORT,
}

export interface ActionInterface {
  command: Command;
  x?: number;
  y?: number;
  direction?: Direction;
}

export const Actions = {
  [Command.PLACE]: PlaceRobot,
  [Command.MOVE]: MoveForward,
  [Command.LEFT]: TurnLeft,
  [Command.RIGHT]: TurnRight,
  [Command.REPORT]: ReportPosition,
};
