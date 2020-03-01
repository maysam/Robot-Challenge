import { expect, assert } from 'chai';

import Table from '../lib/table';
import Robot from '../lib/robot';
import { Direction } from '../lib/directions';

const width = 5;
const height = 5;
const table = new Table({ width, height });

describe('Tables', () => {
	it('creates table according to constructor inputs', () => {
		assert.equal(table.width, width);
		assert.equal(table.height, height);
	});
	describe('contains', () => {
		it('returns true when the given point is inside the table', () => {
			assert.isTrue(
				table.contains(new Robot({ x: 0, y: 0, facing: Direction.East, table }))
			);
		});
		it('returns false for points outside the table', () => {
			assert.isFalse(
				table.contains(
					new Robot({ x: width, y: height, facing: Direction.East, table })
				)
			);
		});
	});
});
