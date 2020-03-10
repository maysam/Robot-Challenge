export enum Direction {
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

export namespace Direction {
  export const isValid = (direction: string): boolean => direction in mappings


  export const parse = (direction: string): Direction => {
    if (isValid(direction)) {
      return mappings[direction];
    }
    throw 'Invalid Direction';
  };
}

export const leftsOf = {
  NORTH: Direction.West,
  WEST: Direction.South,
  SOUTH: Direction.East,
  EAST: Direction.North,
};

export const leftOf = (direction: Direction): Direction => {
  return leftsOf[direction];
};

export const rightsOf = {
  NORTH: Direction.East,
  WEST: Direction.North,
  SOUTH: Direction.West,
  EAST: Direction.South,
};

export const rightOf = (direction: Direction): Direction => {
  return rightsOf[direction];
};

export const vectorOf: Record<Direction, [number, number]> = {
  NORTH: [0, 1],
  WEST: [-1, 0],
  SOUTH: [0, -1],
  EAST: [1, 0],
};

export const movement = (direction: Direction): [number, number] => {
  return vectorOf[direction];
};
