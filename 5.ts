import * as fs from 'fs';
const input = fs.readFileSync('./5-input.txt');
let codes = input.toString().split('').map(s => s.charCodeAt(0));

function getLength(codes: number[]) {
  let ptr = 0;
  while (ptr < codes.length - 1) {
    const c1 = codes[ptr];
    const c2 = codes[ptr + 1];
    const diff = Math.abs(c1 - c2);
    if (diff === 32) { // 97 - 65 = 32, 97 = ascii a, 65 = ascii A
      codes = codes.slice(0, ptr).concat(codes.slice(ptr + 2));
      ptr = 0;
    } else {
      ptr++;
    }
  }
  return codes.length;
}

// part a
console.log(getLength(codes));

// part b - meh brute force
for (let i = 65; i < 91; ++i) {
  console.log(String.fromCharCode(i), getLength(codes.filter(code => code !== i && code !== i + 32)));
}
