import * as fs from 'fs';
const input = fs.readFileSync('./1-input.txt');
const lines = input.toString().split('\n');
const deltas = lines.map(line => parseInt(line));

function findRepeatedFrequency(lines: number[]): Number {
  const seenFrequencies = new Set<Number>();
  let last = 0;
  let idx = 0;
  while (true) {
    const frequency = last + lines[idx++];
    if (seenFrequencies.has(frequency)) {
      return frequency;
    } else {
      seenFrequencies.add(frequency);
    }
    if (idx >= lines.length) idx = 0;
    last = frequency;
  }
}

console.log(findRepeatedFrequency(deltas));
