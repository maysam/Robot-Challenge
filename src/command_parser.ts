import { isValidDirection, toDirection } from '../lib/directions';
import { Command } from '../lib/commands';

const CommandParser = {
	parse: command => {
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
			const [_, x_str, y_str, direction] = command.match(
				/PLACE\s(\d+),(\d+),([A-Z]+)/
			);
			if (isValidDirection(direction)) {
				return {
					command: Command.PLACE,
					x: parseInt(x_str),
					y: parseInt(y_str),
					direction: toDirection(direction),
				};
			} else {
				throw 'Invalid Direction';
			}
		}

		throw 'Invalid Command';
	},
};

export default CommandParser;
