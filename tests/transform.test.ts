import { spawn } from 'child_process';
import path from 'path';

const runCli = (input: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cliPath = path.resolve(__dirname, '../dist/transform.js');
    const proc = spawn('node', [cliPath]);

    let output = '';
    proc.stdout.on('data', (data) => output += data.toString());
    proc.stderr.on('data', (err) => reject(err.toString()));
    proc.on('close', () => resolve(output));

    proc.stdin.write(JSON.stringify(input));
    proc.stdin.end();
  });
};

describe('CLI Transform', () => {
  it('should transform input JSON to simplified JSON', async () => {
    const input = {
      id: 1,
      name: 'CLI Test'
    };

    const result = await runCli(input);
    const parsed = JSON.parse(result);
    expect(parsed).toEqual({
      id: 1,
      name: 'CLI Test',
      active: true
    });
  });
});
