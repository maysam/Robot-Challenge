import Table from '../lib/table';
import RobotEngine from '../lib/robot_engine';
import CommandParser from './command_parser';

export default class application {
  engine: RobotEngine;

  constructor({ width = 5, height = 5 }) {
    this.engine = new RobotEngine({ width, height });
  }

  run() {
    process.stdin.on('data', buffer => {
      const inputs = buffer.toString().split('\n')
      inputs.pop() // remove the last part after last newline character
      for (const index in inputs) {
        const input = inputs[index]
        try {
          const { command, ...args } = CommandParser.parse(input);
          this.engine.execute(command, args);
        } catch (err) {
          console.error(err);
        }
      }
    });
  }
}

