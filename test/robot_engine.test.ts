import { expect, assert } from 'chai';
import sinon from 'ts-sinon';

import RobotEngine from '../lib/robot_engine';
import Table from '../lib/table';
import Direction from '../lib/directions';
import {
  Command,
  TurnLeft,
  TurnRight,
  MoveForward,
  PlaceRobot,
  ReportPosition,
} from '../lib/actions';

const width = 5;
const height = 5;
const table = new Table({ width, height });
const x = 1;
const y = 2;
const direction = Direction.East;
let robotEngine = null;
let sandbox = null;

describe('Robot Engine', () => {
  beforeEach(() => {
    robotEngine = new RobotEngine(table);
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('execute', () => {
    it('places robot on the table for PLACE command', () => {
      const runSpy = sandbox.spy(PlaceRobot.prototype, 'run');
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      assert(runSpy.calledOnce);
      assert.isObject(robotEngine.robot);
    });

    it('throws an error if the first command is not the PLACE command', () => {
      expect(() => robotEngine.execute(Command.MOVE, {})).to.throw(
        'The first valid command to the robot is a PLACE command'
      );
      assert.isNotObject(robotEngine.robot);
    });

    it('calls move on robot for MOVE command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const spy = sandbox.spy(MoveForward.prototype, 'run');
      robotEngine.execute(Command.MOVE);
      assert(spy.calledOnce);
    });

    it('calls turnLeft on robot for LEFT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const spy = sandbox.spy(TurnLeft.prototype, 'run');
      robotEngine.execute(Command.LEFT);
      assert(spy.calledOnce);
    });

    it('calls turnLeft on robot for RIGHT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const spy = sandbox.spy(TurnRight.prototype, 'run');
      robotEngine.execute(Command.RIGHT, {});
      assert(spy.calledOnce);
    });

    it('calls toString on robot and log on console for REPORT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const stubConsole = sandbox.stub(console, 'log');
      const spy = sandbox.spy(ReportPosition.prototype, 'run');
      robotEngine.execute(Command.REPORT, {});
      assert(spy.calledOnce);
      assert(stubConsole.calledOnce);
    });
  });
});
