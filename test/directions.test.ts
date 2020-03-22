import { expect, assert } from 'chai';

import Direction from '../lib/directions';

const {
  isValid,
  parse,
  leftOf,
  rightOf,
  movement,
  North,
  East,
  South,
  West,
} = Direction;

describe('Directions', () => {
  describe('parse', () => {
    it('converts string directions to Type Direction', () => {
      assert.equal(parse('NORTH'), North);
    });

    it('throws error when string is not a valid direction', () => {
      expect(() => parse('wrong_direction')).to.throw('Invalid Direction');
    });
  });

  describe('isValid', () => {
    it('should validated direction strings correctly', () => {
      assert(isValid('NORTH'));
      assert.isFalse(isValid('North'));

      assert(isValid('EAST'));
      assert(isValid('SOUTH'));
      assert(isValid('WEST'));
    });
  });

  describe('leftOf', () => {
    it('should turn around correctly', () => {
      assert.equal(leftOf(North), West);
      assert.equal(leftOf(leftOf(leftOf(leftOf(North)))), North);
    });
  });

  describe('rightOf', () => {
    it('should turn around correctly', () => {
      assert.equal(rightOf(North), East);
      assert.equal(rightOf(rightOf(rightOf(rightOf(North)))), North);
    });
  });

  describe('movement', () => {
    it('returns the correct translation vector', () => {
      assert.deepEqual(movement(North), [0, 1]);
      assert.deepEqual(movement(East), [1, 0]);
      assert.deepEqual(movement(West), [-1, 0]);
      assert.deepEqual(movement(South), [0, -1]);
    });
  });
});
