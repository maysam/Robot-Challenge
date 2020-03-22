import { expect } from 'chai';

import Robot from '../lib/robot';
import Table from '../lib/table';
import Direction from '../lib/directions';

const table = new Table({ width: 5, height: 5 });
const facing = Direction.North;
const robot = new Robot({ x: 0, y: 0, facing, table });

describe('Robot', () => {
  describe('toString', () => {
    it('prints the robot position and facing', () => {
      expect(robot.toString()).to.equal('0,0,NORTH');
    });
  });
});
