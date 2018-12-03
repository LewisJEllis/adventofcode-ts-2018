import * as fs from 'fs';
const input = fs.readFileSync('./2-input.txt');
const lines = input.toString().split('\n');

let numTwice = 0;
let numThrice = 0;
function checkLine(line: String) {
  const letters = new Map<String, number>();
  const chars = line.split('');
  chars.forEach(char => {
    letters.set(char, (letters.get(char) || 0) + 1);
  })
  const counts = Array.from(letters.values());
  if (counts.includes(2)) ++numTwice;
  if (counts.includes(3)) ++numThrice;
}

lines.forEach(checkLine);
console.log(numThrice * numTwice);
