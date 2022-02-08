import fs from 'fs';

const BOARDFILEPATH = '../public/test_board.txt';
const DICTTXTFILEPATH = '../public/dictionary.txt';
const DICTJSONFILEPATH = '../public/dictionary.json';

export const arrToHash = (arr) => {
  const hash = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const word of arr) {
    hash[word] = 1;
  }

  return hash;
};

const readDictTxtToJSON = (filepath, outpath) => {
  fs.readFile(filepath, (err, data) => {
    if (err) throw err;
    const stringDict = data.toString();
    const dictArr = stringDict.split('\n');
    const dictHash = arrToHash(dictArr);
    const jsonDict = JSON.stringify(dictHash);

    fs.writeFile(outpath, jsonDict, 'utf8', (err) => {
      if (err) {
        throw err;
      }
      console.log('JSON file has been saved');
    });
  });
};
export const readDictJson = (filepath) => {
  // sync fileread
  const dict = JSON.parse(fs.readFileSync(filepath, 'utf8'));
  return dict;
};

export const readBoard = () => {
  const boardTxt = fs.readFileSync(BOARDFILEPATH, 'utf8');
  // console.log('boardTxt :>> ', boardTxt);
  return boardTxt;
};
// readDictTxtToJSON(DICTTXTFILEPATH, DICTJSONFILEPATH);
console.log(readDictJson(DICTJSONFILEPATH));
console.log('readBoard :>> ', readBoard());
