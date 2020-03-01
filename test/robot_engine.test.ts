import { expect, assert } from 'chai';
import * as sinon from 'ts-sinon';

import RobotEngine from '../lib/robot_engine';
import Table from '../lib/table';
import { RobotType } from '../lib/robot';
import { Direction } from '../lib/directions';
import { Command } from '../lib/commands';

const width = 5;
const height = 5;
const table = new Table({ width, height });
const x = 1;
const y = 2;
const direction = Direction.East;
let robot_engine = null;

describe('Robot Engine', () => {
	beforeEach(() => {
		robot_engine = new RobotEngine(table);
	});
	describe('execute', () => {
		it('places robot on the table for PLACE command', () => {
			const spy = sinon.default.spy(robot_engine, 'place_robot');
			robot_engine.execute(Command.PLACE, {
				x,
				y,
				direction,
			});
			assert.isTrue(spy.calledWithExactly({ x, y, direction }));
		});

		it('throws an error if the first command is not the PLACE command', () => {
			expect(() => robot_engine.execute(Command.MOVE, {})).to.throw(
				'The first valid command to the robot is a PLACE command'
			);
		});

		it('calls move on robot for MOVE command', () => {
			robot_engine.execute(Command.PLACE, {
				x,
				y,
				direction,
			});
			const spy = sinon.default.spy(robot_engine.robot, 'move');
			robot_engine.execute(Command.MOVE, {});
			assert.isTrue(spy.calledOnce);
		});

		it('calls turnLeft on robot for LEFT command', () => {
			robot_engine.execute(Command.PLACE, {
				x,
				y,
				direction,
			});
			const spy = sinon.default.spy(robot_engine.robot, 'turnLeft');
			robot_engine.execute(Command.LEFT, {});
			assert.isTrue(spy.calledOnce);
		});

		it('calls turnLeft on robot for RIGHT command', () => {
			robot_engine.execute(Command.PLACE, {
				x,
				y,
				direction,
			});
			const spy = sinon.default.spy(robot_engine.robot, 'turnRight');
			robot_engine.execute(Command.RIGHT, {});
			assert.isTrue(spy.calledOnce);
		});

		it('calls toString on robot and log on console for REPORT command', () => {
			robot_engine.execute(Command.PLACE, {
				x,
				y,
				direction,
			});
			const stubConsole = sinon.default.stub(console, 'log');
			const spy = sinon.default.spy(robot_engine.robot, 'toString');
			robot_engine.execute(Command.REPORT, {});
			assert.isTrue(spy.calledOnce);
			assert.isTrue(stubConsole.calledOnce);
		});
	});

	describe('place robot', () => {
		it('places the robot on the table', () => {
			robot_engine.place_robot({ x, y, direction });
			assert.deepEqual(robot_engine.robot as RobotType, {
				x,
				y,
				facing: direction,
				table,
			});
		});

		it('throws error if the robot is off the table', () => {
			expect(() =>
				robot_engine.place_robot({ x: 11, y: 11, direction })
			).to.throw('Cannot place robot outside the table');
		});
	});
});
