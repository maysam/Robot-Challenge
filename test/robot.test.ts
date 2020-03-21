import { expect } from 'chai';

import Robot from '../lib/robot';
import Table from '../lib/table';
import { Direction } from '../lib/directions';

const table = new Table({ width: 5, height: 5 });
const facing = Direction.North;

describe('Robot', () => {
  describe('turnLeft', () => {
    it('should return a robot facing to the left', () => {
      let robot = new Robot({ x: 0, y: 0, facing, table });
      robot = robot.turnLeft();
      expect(robot.facing).to.equal(Direction.West);
    });

    it('should face same direction after turning 4 times', () => {
      let robot = new Robot({ x: 0, y: 0, facing, table });

      robot = robot
        .turnLeft()
        .turnLeft()
        .turnLeft()
        .turnLeft();
      expect(robot.facing).to.eq(facing);
    });
  });

  describe('turnRight', () => {
    it('should return a robot facing to the left', () => {
      let robot = new Robot({ x: 0, y: 0, facing, table });
      robot = robot.turnRight();
      expect(robot.facing).to.equal(Direction.East);
    });

    it('should face same direction after turning 4 times', () => {
      let robot = new Robot({ x: 0, y: 0, facing, table });

      robot = robot
        .turnRight()
        .turnRight()
        .turnRight()
        .turnRight();
      expect(robot.facing).to.eq(facing);
    });
  });

  describe('move', () => {
    it('moves robot one unit forward', () => {
      let robot = new Robot({ x: 0, y: 0, facing: Direction.North, table });
      robot = robot.move();
      expect(robot.y).to.equal(1);

      robot = new Robot({ x: 0, y: 0, facing: Direction.East, table });
      robot = robot.move();
      expect(robot.x).to.equal(1);
    });

    it('doesnt move off the table', () => {
      let robot = new Robot({ x: 0, y: 0, facing: Direction.West, table });
      robot = robot.move();
      expect(robot.x).to.equal(0);
      expect(robot.y).to.equal(0);
    });
  });

  describe('toString', () => {
    it('prints the robot position and facing', () => {
      const robot = new Robot({ x: 0, y: 0, facing, table });
      expect(robot.toString()).to.equal('0,0,NORTH');
    });
  });
});
