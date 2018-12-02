import * as fs from 'fs';
const input = fs.readFileSync('./1-input.txt');
const lines = input.toString().split('\n');
const deltas = lines.map(line => parseInt(line));

console.log(deltas.reduce((a, b) => a + b));
