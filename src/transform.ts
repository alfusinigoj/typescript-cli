#!/usr/bin/env node
import { Entity } from './entity';
import * as fs from 'fs';

const readStdin = async (): Promise<string> => {
  return new Promise((resolve) => {
    let input = '';
    process.stdin.on('data', (chunk) => input += chunk);
    process.stdin.on('end', () => resolve(input));
  });
};

(async () => {
  try {
    const raw = await readStdin();
    const json = JSON.parse(raw);
    const entity = new Entity().fromJson(json);
    const simplified = entity.toJson();
    process.stdout.write(JSON.stringify(simplified));
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
})();
