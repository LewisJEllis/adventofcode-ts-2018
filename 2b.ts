import * as fs from 'fs';
const input = fs.readFileSync('./2-input.txt');
const lines = input.toString().split('\n');

const lineTotals = new Map<number, number>();

// I've implemented levenshtein in Java and Python but not in JS/TS,
// so I borrowed this from: https://gist.github.com/andrei-m/982927
function levenshteinDistance(a: String, b: String): number {
  if(a.length == 0) return b.length; 
  if(b.length == 0) return a.length; 

  var matrix = [];

  // increment along the first column of each row
  var i;
  for(i = 0; i <= b.length; i++){
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for(j = 0; j <= a.length; j++){
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for(i = 1; i <= b.length; i++){
    for(j = 1; j <= a.length; j++){
      if(b.charAt(i-1) == a.charAt(j-1)){
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(matrix[i-1][j-1] + 1, // substitution
                                Math.min(matrix[i][j-1] + 1, // insertion
                                         matrix[i-1][j] + 1)); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
};

let start = 0;
for (let start = 0; start < lines.length; ++start) {
  for (let idx = 0; idx < lines.length; ++idx) {
    if (levenshteinDistance(lines[start], lines[idx]) === 1) {
      // just log them and visually compare, it's faster than implementing ¯\_(ツ)_/¯
      console.log(lines[start]);
      console.log(lines[idx]);
    }
  }
}
