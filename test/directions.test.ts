import { expect, assert } from 'chai';

import { Direction, leftOf, rightOf, movement } from '../lib/directions';

describe('Directions', () => {
	describe('toDirection', () => {
		it('converts string directions to Type Direction', () => {
			assert.equal(Direction.parse('NORTH'), Direction.North);
		});

		it('throws error when string is not a valid direction', () => {
			expect(() => Direction.parse('wrong_direction')).to.throw(
				'Invalid Direction'
			);
		});
	});

	describe('isValidDirection', () => {
		it('should validated direction strings correctly', () => {
			assert.isTrue(Direction.isValid('NORTH'));
			assert.isFalse(Direction.isValid('North'));

			assert.isTrue(Direction.isValid('EAST'));
			assert.isTrue(Direction.isValid('SOUTH'));
			assert.isTrue(Direction.isValid('WEST'));
		});
	});

	describe('leftOf', () => {
		it('should turn around correctly', () => {
			assert.equal(leftOf(Direction.North), Direction.West);
			assert.equal(
				leftOf(leftOf(leftOf(leftOf(Direction.North)))),
				Direction.North
			);
		});
	});

	describe('rightOf', () => {
		it('should turn around correctly', () => {
			assert.equal(rightOf(Direction.North), Direction.East);
			assert.equal(
				rightOf(rightOf(rightOf(rightOf(Direction.North)))),
				Direction.North
			);
		});
	});

	describe('movement', () => {
		it('returns the correct translation vector', () => {
			assert.deepEqual(movement(Direction.North), [0, 1]);
			assert.deepEqual(movement(Direction.East), [1, 0]);
			assert.deepEqual(movement(Direction.West), [-1, 0]);
			assert.deepEqual(movement(Direction.South), [0, -1]);
		});
	});
});
