import { assert } from 'chai';
import sinon from 'ts-sinon';

import {
  PlaceRobot,
  TurnLeft,
  TurnRight,
  MoveForward,
  ReportPosition,
} from '../lib/actions';
import Table from '../lib/table';
import Robot from '../lib/robot';
import Direction from '../lib/directions';

const table = new Table({ width: 5, height: 5 });
const x = 0;
const y = 0;
const direction = Direction.North;
const params = { x, y, direction };
const startingRobot = new Robot({ table, x, y, facing: direction });

describe('Commands', () => {
  describe('PlaceRobot', () => {
    it('places robot on the table', () => {
      const command = new PlaceRobot(table, startingRobot, params);
      const newRobot = command.run();
      assert.deepEqual(newRobot, startingRobot);
    });

    it("doesn't place robot outside the board", () => {
      const command = new PlaceRobot(table, startingRobot, {
        x: -1,
        y,
        direction,
      });
      assert.throws(
        () => command.run(),
        'Cannot place robot outside the table'
      );
    });
  });

  describe('TurnLeft', () => {
    it('should return a robot facing to the left of given robot', () => {
      const command = new TurnLeft(table, startingRobot);
      const newRobot = command.run();
      assert.equal(newRobot.facing, Direction.leftOf(startingRobot.facing));
    });

    it('should face same direction after turning left 4 times', () => {
      const command1 = new TurnLeft(table, startingRobot);
      const newRobot1 = command1.run();

      const command2 = new TurnLeft(table, newRobot1);
      const newRobot2 = command2.run();

      const command3 = new TurnLeft(table, newRobot2);
      const newRobot3 = command3.run();

      const command4 = new TurnLeft(table, newRobot3);
      const newRobot4 = command4.run();

      assert.equal(newRobot4.facing, startingRobot.facing);
    });
  });

  describe('TurnRight', () => {
    it('should return a robot facing to the right of given robot', () => {
      const command = new TurnRight(table, startingRobot);
      const newRobot = command.run();
      assert.equal(newRobot.facing, Direction.rightOf(startingRobot.facing));
    });

    it('should face same direction after turning right 4 times', () => {
      const command1 = new TurnRight(table, startingRobot);
      const newRobot1 = command1.run();

      const command2 = new TurnRight(table, newRobot1);
      const newRobot2 = command2.run();

      const command3 = new TurnRight(table, newRobot2);
      const newRobot3 = command3.run();

      const command4 = new TurnRight(table, newRobot3);
      const newRobot4 = command4.run();

      assert.equal(newRobot4.facing, startingRobot.facing);
    });
  });

  describe('MoveForward', () => {
    it('moves robot one unit forward horizontally', () => {
      const customRobot = new Robot({
        ...params,
        facing: Direction.East,
        table,
      });

      const command = new MoveForward(table, customRobot);
      const newRobot = command.run();

      assert.equal(newRobot.x, x + 1);
      assert.equal(newRobot.y, y);
    });

    it('moves robot one unit forward vertically', () => {
      const customRobot = new Robot({
        ...params,
        facing: Direction.North,
        table,
      });

      const command = new MoveForward(table, customRobot);
      const newRobot = command.run();

      assert.equal(newRobot.x, x);
      assert.equal(newRobot.y, y + 1);
    });

    it('doesnt move off the table', () => {
      const customRobot = new Robot({
        ...params,
        facing: Direction.West,
        table,
      });

      const command = new MoveForward(table, customRobot);
      const newRobot = command.run();

      assert.equal(newRobot.x, x);
      assert.equal(newRobot.y, y);
    });
  });

  describe('ReportPosition', () => {
    it('prints the robot position and facing', () => {
      const sandbox = sinon.createSandbox();
      const stubConsole = sandbox.stub(console, 'log');
      const spy = sandbox.spy(startingRobot, 'toString');

      const command = new ReportPosition(table, startingRobot);
      command.run();

      assert(spy.calledOnce);
      sandbox.assert.calledOnceWithExactly(stubConsole, 'OUTPUT: 0,0,NORTH');
      sandbox.restore();
    });
  });
});
