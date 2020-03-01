import { expect, assert } from 'chai';

import {
	Direction,
	isValidDirection,
	toDirection,
	leftOf,
	rightOf,
	movement,
} from '../lib/directions';

describe('Directions', () => {
	describe('toDirection', () => {
		it('converts string directions to Type Direction', () => {
			assert.equal(toDirection('NORTH'), Direction.North);
		});

		it('throws error when string is not a valid direction', () => {
			expect(() => toDirection('wrong_direction')).to.throw('Invalid Direction');
		});
	});

	describe('isValidDirection', () => {
		it('should validated direction strings correctly', () => {
			assert.isTrue(isValidDirection('NORTH'));
			assert.isFalse(isValidDirection('North'));

			assert.isTrue(isValidDirection('EAST'));
			assert.isTrue(isValidDirection('SOUTH'));
			assert.isTrue(isValidDirection('WEST'));
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
