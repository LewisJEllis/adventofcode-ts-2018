import * as fs from 'fs';
const input = fs.readFileSync('./3-input.txt');
const lines = input.toString().split('\n');

interface Claim {
  x: number,
  y: number,
  w: number,
  h: number,
}

const edgeLength = 1100;
const fabric = new Array(edgeLength).fill(null).map(x => new Array(edgeLength).fill(0));

const parser = /#\d{1,4} @ (\d{1,4}),(\d{1,4}): (\d{1,2})x(\d{1,2})/;
function parseLine(line: string): Claim {
  const match = parser.exec(line);
  if (match !== null) {
    return {
      x: +match[1],
      y: +match[2],
      w: +match[3],
      h: +match[4],
    }
  } else {
    return { x: 0, y: 0, w: 0, h: 0 };
  }
}

function markClaim(claim: Claim) {
  for (let i = claim.x; i < claim.x + claim.w; ++i) {
    for (let j = claim.y; j < claim.y + claim.h; ++j) {
      fabric[j][i]++;
    }
  }
}

lines.map(parseLine).forEach(markClaim);

let numOverlaps = 0;
for (let i = 0; i < edgeLength; ++i) {
  for (let j = 0; j < edgeLength; ++j) {
    if (fabric[j][i] > 1) numOverlaps++;
  }
}

console.log(numOverlaps);
