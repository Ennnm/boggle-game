import * as readFromTxt from './read-txt.mjs';
import * as boardFunc from './board.mjs';

// Each 3 and 3 letters word will earn you one point.
// A 5-letter word will award you two points.
// A 6-letter word will give you three points.
// A 7-letter word will award you five points.
// And finally, any word with eight or more letters will give you eleven points.

// can same dice characters be repeated? no
// adjacent char include diagonals

// direction, row displacement, col displacement
const directionCoord = {
  top: [-1, 0],
  left: [0, -1],
  bottom: [1, 0],
  right: [0, 1],
  topL: [-1, -1],
  botL: [1, -1],
  botR: [1, 1],
  topR: [-1, 1],
};

const addDirection = (row, col, coord) => [row + coord[0], col + coord[1]];

const getAdjacentCoord = (row, col) => {
  // arr of [row, col]
  const dirCoords = Object.values(directionCoord);
  const adjCoords = dirCoords.map((coord) => addDirection(row, col, coord));
  return adjCoords;
};

const filterCoordsOnBoard = (coords, rowMax, colMax) => {
  const validCoord = coords.filter((coord) => {
    const [row, col] = coord;
    let isValid = true;
    if (row >= rowMax || row < 0) {
      isValid = false;
    }
    if (col >= colMax || col < 0) {
      isValid = false;
    }
    return isValid;
  });
  return validCoord;
};
const validCoordsFromPosition = (row, col) => {
  const adjacentCoords = getAdjacentCoord(row, col);
  const validCoord = filterCoordsOnBoard(
    adjacentCoords,
    boardFunc.numRow,
    boardFunc.numCol
  );
  return validCoord;
};

export const checkWordInBoard = (boardStr, word) => {
  console.log('in check word in board');
  const boardArr2 = boardFunc.convertBoardStrToArr2(boardStr);

  const numRow = boardArr2.length;
  const charArr = word.toUpperCase().split('');
  const revCharArr = charArr.reverse();
  let found = false;
  // dfs
  // iterate through all rows and cols for matching char which is char or *
  // if character matches, add that coord to searched hash
  // search adjacent cell that is not in searched hash for the next character
  // each coord has a unique search hash
  // if character does not match the word, rebuild the hash for that coordinate and try the next one visited ={coord}
  // if none of the valid characters match the word, remove the current coordinate from the hash
  // if word is found, break from the search function, return found

  // broken
  const dfs = (at, remaining, visited) => {
    console.log('at :>> ', at);
    console.log('remaining :>> ', remaining);
    console.log('visited :>> ', visited);
    if (remaining.length === 0) {
      found = true;
      return true;
    }
    const [r, c] = at;
    const cellChar = boardArr2[r][c];
    console.log('cellChar :>> ', cellChar);
    const wordChar = remaining.pop();
    console.log('wordChar :>> ', wordChar);
    if (cellChar === wordChar || cellChar === '*') {
      visited.push(at);
      const nextCoords = validCoordsFromPosition(r, c);
      nextCoords.forEach((coord) => {
        if (!(coord in visited)) {
          dfs([coord[0], coord[1]], remaining, visited);
        }
      });
      visited.pop(); // pop at the same level where visited is pushed
    } else {
      remaining.push(wordChar);
    }
  };
  // adapted from https://leetcode.com/problems/word-search-ii/discuss/138279/Clean-JavaScript-solution
  const search = (at, remaining) => {
    // console.log('boardArr2 :>> ', boardArr2);
    if (remaining.length === 0) {
      found = true;
      return true;
    }
    const [r, c] = at;
    const char = boardArr2[r][c];
    const currChar = remaining.pop();

    if (char === currChar || char === '*') {
      const validMoves = validCoordsFromPosition(r, c);

      boardArr2[r][c] = '#';
      validMoves.forEach((move) => {
        search(move, remaining);
      });

      boardArr2[r][c] = currChar; // reset for other backtracking paths
    } else {
      remaining.push(currChar);
    }
  };

  for (let i = 0; i < numRow; i += 1) {
    const row = boardArr2[i];
    for (let j = 0; j < row.length; j += 1) {
      // console.log('i,j ============================================:>> ', i, j);
      const revCharCopy = [...revCharArr];
      search([i, j], revCharCopy);
    }
  }
  console.log('found :>> ', found);
  return found;
};

export const checkWordInDict = (word) => {
  const dict = readFromTxt.readDictJson();
  let isInDict = false;
  if (word in dict) {
    console.log(`${word} in dictionary`);
    isInDict = true;
  }
  return isInDict;
};

export const wordScore = (word) => {
  const wordLen = word.length;
  return wordLen;
  let score = 0;

  switch (wordLen) {
    case 3:
      score = 1;
      break;
    case 5:
      score = 2;
      break;
    case 6:
      score = 3;
      break;
    case 7:
      score = 5;
      break;
    default:
      score = 0;
  }
  if (wordLen >= 8) {
    score = 11;
  }
  return score;
};
