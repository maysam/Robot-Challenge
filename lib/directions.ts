enum Direction {
  North = 'NORTH',
  East = 'EAST',
  South = 'SOUTH',
  West = 'WEST',
}

const mappings = {
  NORTH: Direction.North,
  EAST: Direction.East,
  SOUTH: Direction.South,
  WEST: Direction.West,
};

const leftsOf = {
  NORTH: Direction.West,
  WEST: Direction.South,
  SOUTH: Direction.East,
  EAST: Direction.North,
};

const rightsOf = {
  NORTH: Direction.East,
  WEST: Direction.North,
  SOUTH: Direction.West,
  EAST: Direction.South,
};

const vectorOf: Record<Direction, [number, number]> = {
  NORTH: [0, 1],
  WEST: [-1, 0],
  SOUTH: [0, -1],
  EAST: [1, 0],
};

namespace Direction {
  export const isValid = (direction: string): boolean => direction in mappings;

  export const parse = (direction: string): Direction => {
    if (isValid(direction)) {
      return mappings[direction];
    }
    throw new Error('Invalid Direction');
  };

  export const leftOf = (direction: Direction): Direction => {
    return leftsOf[direction];
  };

  export const rightOf = (direction: Direction): Direction => {
    return rightsOf[direction];
  };
  export const movement = (direction: Direction): [number, number] => {
    return vectorOf[direction];
  };
}

export default Direction;
