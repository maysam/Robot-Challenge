import Direction from '../lib/directions';
import { Command, ActionInterface } from '../lib/actions';

const COMMAND_PARSER_REGEX = /PLACE\s(\d+),(\d+),(.+)/;

const CommandParser = {
  parse: (command): ActionInterface => {
    const translations = {
      MOVE: Command.MOVE,
      LEFT: Command.LEFT,
      RIGHT: Command.RIGHT,
      REPORT: Command.REPORT,
    };

    if (command in translations) {
      return { command: translations[command] };
    }

    if (command.match(COMMAND_PARSER_REGEX)) {
      const [, xStr, yStr, direction] = command.match(COMMAND_PARSER_REGEX);
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
