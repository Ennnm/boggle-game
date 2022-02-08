// Each 3 and 3 letters word will earn you one point.
// A 5-letter word will award you two points.
// A 6-letter word will give you three points.
// A 7-letter word will award you five points.
// And finally, any word with eight or more letters will give you eleven points.

// can same dice characters be repeated? no
// adjacent char include diagonals

export const checkWordInBoard = (boardStr, word) => {};

export const checkWordInDict = (word) => {};

export const wordScore = (word) => {
  const wordLen = word.length;
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
