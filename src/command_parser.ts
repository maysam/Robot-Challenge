import { Direction } from '../lib/directions';
import { Command, CommandInterface } from '../lib/commands';

const CommandParser = {
  parse: (command): CommandInterface => {
    const translations = {
      MOVE: Command.MOVE,
      LEFT: Command.LEFT,
      RIGHT: Command.RIGHT,
      REPORT: Command.REPORT,
    };

    if (command in translations) {
      return { command: translations[command] };
    }

    if (command.match(/PLACE\s(\d+),(\d+),([A-Z]+)/)) {
      const [, xStr, yStr, direction] = command.match(
        /PLACE\s(\d+),(\d+),([A-Z]+)/
      );
      return {
        command: Command.PLACE,
        x: parseInt(xStr, 10),
        y: parseInt(yStr, 10),
        direction: Direction.parse(direction),
      };
    }

    throw new Error('Invalid Command');
  },
};

export default CommandParser;
