import { expect, assert } from 'chai';

import CommandParser from '../src/command_parser';
import { Command } from '../lib/commands';
import { Direction } from '../lib/directions';

describe('CommandParser', () => {
	describe('parse', () => {
		it('converts command string to Typed commands with parsed arguments', () => {
			assert.deepEqual(CommandParser.parse('PLACE 1,1,NORTH'), {
				command: Command.PLACE,
				x: 1,
				y: 1,
				direction: Direction.North,
			});
			assert.equal(CommandParser.parse('MOVE').command, Command.MOVE);
			assert.equal(CommandParser.parse('LEFT').command, Command.LEFT);
			assert.equal(CommandParser.parse('RIGHT').command, Command.RIGHT);
			assert.equal(CommandParser.parse('REPORT').command, Command.REPORT);
		});

		it('throws error for invalid commands', () => {
			expect(() => CommandParser.parse('BADCOMMAND')).to.throw(
				'Invalid Command'
			);
		});
		it('throws error for invalid coordinates for place command', () => {
			expect(() => CommandParser.parse('PLACE a,b,NORTH')).to.throw(
				'Invalid Command'
			);
		});
		it('throws error for invalid direction for place command', () => {
			expect(() => CommandParser.parse('PLACE 1,1,GOLD')).to.throw(
				'Invalid Direction'
			);
		});
	});
});
