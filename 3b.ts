import * as fs from 'fs';
const input = fs.readFileSync('./3-input.txt');
const lines = input.toString().split('\n');

interface Claim {
  id: number,
  x: number,
  y: number,
  w: number,
  h: number,
}

const edgeLength = 1100;
const fabric = new Array(edgeLength).fill(null).map(x => new Array(edgeLength).fill(0));

const parser = /#(\d{1,4}) @ (\d{1,4}),(\d{1,4}): (\d{1,2})x(\d{1,2})/;
function parseLine(line: string): Claim {
  const match = parser.exec(line);
  if (match !== null) {
    return {
      id: +match[1],
      x: +match[2],
      y: +match[3],
      w: +match[4],
      h: +match[5],
    }  
  } else {
    return { id: 0, x: 0, y: 0, w: 0, h: 0 };
  }
}

function markClaim(claim: Claim) {
  for (let i = claim.x; i < claim.x + claim.w; ++i) {
    for (let j = claim.y; j < claim.y + claim.h; ++j) {
      fabric[j][i]++;
    }
  }
}

const claims = lines.map(parseLine);
claims.forEach(markClaim);

function isClaimUncontested(claim: Claim) {
  for (let i = claim.x; i < claim.x + claim.w; ++i) {
    for (let j = claim.y; j < claim.y + claim.h; ++j) {
      if (fabric[j][i] !== 1) return false;
    }
  }
  return true;
}

claims.filter(isClaimUncontested).forEach(claim => console.log(claim.id));
