import sinon from 'ts-sinon';

import Application from '../src/application';
import CommandParser from '../src/command_parser';
import Direction from '../lib/directions';
import { Command } from '../lib/actions';

const app = new Application({});
const x = 3;
const y = 3;
const direction = Direction.East;

let stdin;
let sandbox;

describe('Application', () => {
  describe('run', () => {
    beforeEach(() => {
      stdin = require('mock-stdin').stdin();
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('parsing user input', () => {
      it('parses user input into Commands using CommandParser.parse method', () => {
        const commandParserStub = sandbox
          .stub(CommandParser, 'parse')
          .returns({});
        const robotEngineStub = sandbox.stub(app.engine, 'execute');

        const userInput = `SOMETHING\n`;

        app.run();

        stdin.send(userInput);

        sandbox.assert.calledOnceWithExactly(
          commandParserStub,
          userInput.trim()
        );

        commandParserStub.restore();
        robotEngineStub.restore();
      });
    });

    describe("command execution using robot_engine's execute method", () => {
      let engineExecuteStub;

      beforeEach(() => {
        engineExecuteStub = sandbox.stub(app.engine, 'execute');
      });

      afterEach(() => {
        engineExecuteStub.restore();
      });

      it('executes PLACE command', () => {
        const placeCommand = `PLACE ${x},${y},${Direction.East}\n`;

        app.run();

        stdin.send(placeCommand);

        sandbox.assert.calledOnceWithExactly(engineExecuteStub, Command.PLACE, {
          x,
          y,
          direction,
        });
      });

      it('executes MOVE command', () => {
        const moveCommand = 'MOVE\n';

        app.run();

        stdin.send(moveCommand);
        sandbox.assert.calledOnceWithExactly(
          engineExecuteStub,
          Command.MOVE,
          {}
        );
      });

      it('executes LEFT command', () => {
        const leftCommand = 'LEFT\n';

        app.run();

        stdin.send(leftCommand);
        sandbox.assert.calledOnceWithExactly(
          engineExecuteStub,
          Command.LEFT,
          {}
        );
      });

      it('executes RIGHT command', () => {
        const rightCommand = 'RIGHT\n';

        app.run();

        stdin.send(rightCommand);
        sandbox.assert.calledOnceWithExactly(
          engineExecuteStub,
          Command.RIGHT,
          {}
        );
      });

      it('executes REPORT command', () => {
        const reportCommand = 'REPORT\n';

        app.run();

        stdin.send(reportCommand);
        sandbox.assert.calledOnceWithExactly(
          engineExecuteStub,
          Command.REPORT,
          {}
        );
      });
    });

    describe('error handling', () => {
      let consoleStub;

      beforeEach(() => {
        consoleStub = sandbox.stub(console, 'error');
      });

      afterEach(() => {
        consoleStub.restore();
      });

      it('catches parse errors when commands are in unacceptable format', () => {
        const badCommand = 'bad_command\n';

        app.run();
        stdin.send(badCommand);
        sandbox.assert.calledOnceWithExactly(consoleStub, 'Invalid Command');
      });

      it('catches error when direction has invalid value', () => {
        const badDirection = 'PLACE 1,1,NORTHWEST\n';

        app.run();
        stdin.send(badDirection);
        sandbox.assert.calledOnceWithExactly(consoleStub, 'Invalid Direction');
      });

      it('catches error when robot is placed outside the table', () => {
        const offTable = 'PLACE 11,11,NORTH\n';

        app.run();

        stdin.send(offTable);
        sandbox.assert.calledOnceWithExactly(
          consoleStub,
          'Cannot place robot outside the table'
        );
      });

      it('prints error when first command is not the PLACE command', () => {
        const placeShouldBeFirst = 'MOVE\n';

        app.run();

        stdin.send(placeShouldBeFirst);
        sandbox.assert.calledOnceWithExactly(
          consoleStub,
          'The first valid command to the robot is a PLACE command'
        );
      });
    });
  });
});
