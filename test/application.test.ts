import { expect, assert } from 'chai';
import { default as sinon } from 'ts-sinon';

import Application from '../src/application';
import CommandParser from '../src/command_parser';

import { Direction } from '../lib/directions';
import { Command } from '../lib/commands';

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
				const commandParserStub = sandbox.stub(CommandParser, 'parse').returns({});
				const robotEngineStub = sandbox.stub(app.engine, 'execute');

				const user_input = `SOMETHING\n`;

				app.run();

				stdin.send(user_input);

				sandbox.assert.calledOnceWithExactly(
					commandParserStub,
					user_input.trim()
				);

				commandParserStub.restore()
				robotEngineStub.restore()
			});
		});

		describe('command execution using robot_engine\'s execute method', () => {
			let engine_execute_stub;

			beforeEach(() => {
				engine_execute_stub = sandbox.stub(app.engine, 'execute');
			});

			afterEach(() => {
				engine_execute_stub.restore();
			});

			it('executes PLACE commands', () => {
				const place_command = `PLACE ${x},${y},${Direction.East}\n`;

				app.run();

				stdin.send(place_command);

				sandbox.assert.calledOnceWithExactly(
					engine_execute_stub,
					Command.PLACE,
					{
						x,
						y,
						direction,
					}
				);
			});

			it('executes MOVE command', () => {
				const move_command = 'MOVE\n';

				app.run();

				stdin.send(move_command);
				sandbox.assert.calledOnceWithExactly(
					engine_execute_stub,
					Command.MOVE,
					{}
				);
			});

			it('executes LEFT command', () => {
				const left_command = 'LEFT\n';

				app.run();

				stdin.send(left_command);
				sandbox.assert.calledOnceWithExactly(
					engine_execute_stub,
					Command.LEFT,
					{}
				);
			});

			it('executes RIGHT command', () => {
				const right_command = 'RIGHT\n';

				app.run();

				stdin.send(right_command);
				sandbox.assert.calledOnceWithExactly(
					engine_execute_stub,
					Command.RIGHT,
					{}
				);
			});

			it('executes REPORT command', () => {
				const report_command = 'REPORT\n';

				app.run();

				stdin.send(report_command);
				sandbox.assert.calledOnceWithExactly(
					engine_execute_stub,
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
				const bad_command = 'bad_command\n';

				app.run();
				stdin.send(bad_command);
				sandbox.assert.calledOnceWithExactly(consoleStub, 'Invalid Command');
			});

			it('catches error when direction has invalid value', () => {
				const bad_direction = 'PLACE 1,1,NORTHWEST\n';

				app.run();
				stdin.send(bad_direction);
				sandbox.assert.calledOnceWithExactly(consoleStub, 'Invalid Direction');
			});

			it('catches error when robot is placed outside the table', () => {
				const off_table = 'PLACE 11,11,NORTH\n';

				app.run();

				stdin.send(off_table);
				sandbox.assert.calledOnceWithExactly(
					consoleStub,
					'Cannot place robot outside the table'
				);
			});

			it('prints error when first command is not the PLACE command', () => {
				const place_should_be_first = 'MOVE\n';

				app.run();

				stdin.send(place_should_be_first);
				sandbox.assert.calledOnceWithExactly(
					consoleStub,
					'The first valid command to the robot is a PLACE command'
				);
			});
		});
	});
});
