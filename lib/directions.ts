// import Robot from './robot';

export enum Direction {
  North = 'NORTH',
  East = 'EAST',
  South = 'SOUTH',
  West = 'WEST',
}

export const toDirection = (direction: string): Direction => {
  if (direction == 'NORTH') {
    return Direction.North;
  }
  if (direction == 'EAST') {
    return Direction.East;
  }
  if (direction == 'SOUTH') {
    return Direction.South;
  }
  if (direction == 'WEST') {
    return Direction.West;
  }
  throw 'Invalid Direction';
};

export const isValidDirection = (direction: string): boolean => {
  return Object.values(Direction).includes(direction as Direction);
};

export const leftOf = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.North:
      return Direction.West;
    case Direction.West:
      return Direction.South;
    case Direction.South:
      return Direction.East;
    case Direction.East:
      return Direction.North;
  }
};

export const rightOf = (direction: Direction): Direction => {
  switch (direction) {
    case Direction.North:
      return Direction.East;
    case Direction.East:
      return Direction.South;
    case Direction.South:
      return Direction.West;
    case Direction.West:
      return Direction.North;
  }
};

export const movement = (direction: Direction): [number, number] => {
  switch (direction) {
    case Direction.North:
      return [0, 1];
    case Direction.East:
      return [1, 0];
    case Direction.South:
      return [0, -1];
    case Direction.West:
      return [-1, 0];
  }
};

// it's better for the direction module not to know about robots et al
// export const movement = (direction: Direction, robot: Robot): Robot => {
//   switch (direction) {
//     case Direction.North:
//       return robot.cloneWith({ y: robot.y + 1 });
//     case Direction.East:
//       return robot.cloneWith({ x: robot.x + 1 });
//     case Direction.South:
//       return robot.cloneWith({ y: robot.y - 1 });
//     case Direction.West:
//       return robot.cloneWith({ x: robot.x - 1 });
//   }
// };
