import { expect, assert } from 'chai';
import * as sinon from 'ts-sinon';

import RobotEngine from '../lib/robot_engine';
import Table from '../lib/table';
import { RobotInterface } from '../lib/robot';
import { Direction } from '../lib/directions';
import { Command } from '../lib/commands';

const width = 5;
const height = 5;
const table = new Table({ width, height });
const x = 1;
const y = 2;
const direction = Direction.East;
let robotEngine = null;

describe('Robot Engine', () => {
  beforeEach(() => {
    robotEngine = new RobotEngine(table);
  });
  describe('execute', () => {
    it('places robot on the table for PLACE command', () => {
      const spy = sinon.default.spy(robotEngine, 'placeRobot');
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      assert.isTrue(spy.calledWithExactly({ x, y, direction }));
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
      const spy = sinon.default.spy(robotEngine.robot, 'move');
      robotEngine.execute(Command.MOVE, {});
      assert.isTrue(spy.calledOnce);
    });

    it('calls turnLeft on robot for LEFT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const spy = sinon.default.spy(robotEngine.robot, 'turnLeft');
      robotEngine.execute(Command.LEFT, {});
      assert.isTrue(spy.calledOnce);
    });

    it('calls turnLeft on robot for RIGHT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const spy = sinon.default.spy(robotEngine.robot, 'turnRight');
      robotEngine.execute(Command.RIGHT, {});
      assert.isTrue(spy.calledOnce);
    });

    it('calls toString on robot and log on console for REPORT command', () => {
      robotEngine.execute(Command.PLACE, {
        x,
        y,
        direction,
      });
      const stubConsole = sinon.default.stub(console, 'log');
      const spy = sinon.default.spy(robotEngine.robot, 'toString');
      robotEngine.execute(Command.REPORT, {});
      assert.isTrue(spy.calledOnce);
      assert.isTrue(stubConsole.calledOnce);
    });
  });

  describe('place robot', () => {
    it('places the robot on the table successfully', () => {
      const robot = robotEngine.placeRobot({ x, y, direction });
      assert.deepEqual(robot as RobotInterface, {
        x,
        y,
        facing: direction,
        table,
      });
    });

    it('throws error if the robot is off the table', () => {
      expect(() =>
        robotEngine.placeRobot({ x: 11, y: 11, direction })
      ).to.throw('Cannot place robot outside the table');
    });
  });
});
