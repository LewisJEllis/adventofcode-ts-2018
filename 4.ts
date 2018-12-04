import * as fs from 'fs';
const input = fs.readFileSync('./4-input.txt');
const lines = input.toString().split('\n');

lines.sort();

function getChunk(lines: string[]): string[] {
  if (!lines.length) return [];
  const chunkLines = [lines.shift() || '']; // start shift line
  while (lines[0] && lines[0].endsWith('p')) chunkLines.push(lines.shift() || '');
  return chunkLines;
}

const minutesAsleep = new Map<number, number>();
const timesSleepingMinute: number[][] = [];
const idParser = /#(\d{1,5})/

const minuteParser = /(\d\d)]/;
function markMinutes(sleep: string, wakeup: string, guardId: number) {
  const sleepMatch = minuteParser.exec(sleep);
  const awakeMatch = minuteParser.exec(wakeup);
  if (sleepMatch !== null && awakeMatch !== null) {
    const sleptAt = +sleepMatch[1];
    const awokeAt = +awakeMatch[1];
    const minutesSlept = awokeAt - sleptAt;
    minutesAsleep.set(guardId, (minutesAsleep.get(guardId) || 0) + minutesSlept);
    for (let i = sleptAt; i < awokeAt; ++i) {
      timesSleepingMinute[guardId][i] = timesSleepingMinute[guardId][i] + 1;
    }
    +sleepMatch[1]
  }
}

let chunk;
while (true) {
  chunk = getChunk(lines);
  if (!chunk.length) break;
  const idMatch = idParser.exec(chunk.shift() || '');
  if (idMatch !== null) {
    let guardId = +idMatch[1];
    if (!minutesAsleep.has(guardId)) {
      minutesAsleep.set(guardId, 0);
      timesSleepingMinute[guardId] = Array(60).fill(0);
    }
    while (chunk.length) {
      markMinutes(chunk.shift() || '', chunk.shift() || '', guardId);
    }
  }
}

// part a
const sortedMinutes = Array.from(minutesAsleep.entries()).sort((e1: number[], e2: number[]) => e2[1] - e1[1]);
const guardId = sortedMinutes[0][0];
const sleepingMinutes = timesSleepingMinute[guardId];
const mostSleepingMinute = sleepingMinutes.indexOf(Math.max(...sleepingMinutes))
console.log(guardId, mostSleepingMinute, guardId * mostSleepingMinute);

// part b
let maxTimesSleeping = 0;
let id = 0;
let minute = 0;
timesSleepingMinute.forEach((record: number[], idx: number) => {
  const max = Math.max(...record);
  if (max > maxTimesSleeping) {
    maxTimesSleeping = max;
    id = idx;
    minute = record.indexOf(max);
  }
})
console.log(maxTimesSleeping, id, minute, id * minute);

// this implementation was definitely on the uglier side...
// ...but it was just a bunch of data crunching, and I solved it reasonably quickly leaderboard-wise
