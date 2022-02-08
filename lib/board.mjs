const boardSize = 16;

const randomNumGen = (max) => {
  // 0 to less than 1
  const randomFloat = Math.random();
  // 0 to abit more than max
  const randomToMaxPlus1 = randomFloat * (max + 1);
  // 0 to max
  const randomNum = Math.floor(randomToMaxPlus1);
  return randomNum;
};

const convertArr1ToStr = (arr) => {
  const boardString = arr.join(', ');
  return boardString;
};
const convertArr1ToArr2 = (arr, numCols) => {
  const copyArr = arr.slice();
  const newArr = [];
  while (copyArr.length) {
    newArr.push(copyArr.splice(0, numCols));
  }
  return newArr;
};

export const convertArr1ToSquareArr = (arr1) => {
  const sqrtBoardSize = Math.sqrt(arr1.length);
  console.log('arr1 :>> ', arr1);
  console.log('arr1 :>> ', arr1.length);
  console.log('sqrtBoardSize :>> ', sqrtBoardSize);
  if (!Number.isInteger(sqrtBoardSize)) {
    throw new Error('Array length is not a square');
  }
  return convertArr1ToArr2(arr1, sqrtBoardSize);
};

export const genRandomBoard = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ*';
  const randomSixteen = [];
  for (let i = 0; i < boardSize; i += 1) {
    const randomNum = randomNumGen(characters.length - 1);
    const randomChar = characters[randomNum];
    randomSixteen.push(randomChar);
  }
  console.log('randomSixteen :>> ', randomSixteen);
  return randomSixteen;
};


export const genRandomBoardStr = () => convertArr1ToStr(genRandomBoard());


export const convertBoardStrToArr1 = (str) => {
  const arr1 = str.split(', ');
  if (arr1.length !== boardSize) {
    throw new Error(`Board string did not produce ${boardSize} elements`);
  }
  return arr1;
};
