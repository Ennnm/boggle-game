export const checkCreateData = (duration, random, board) => {
  if (duration === undefined) {
    throw new Error('Duration is undefined');
  } else if (random === undefined) {
    throw new Error('Random is undefined');
  } else if (random === false && board === undefined) {
    throw new Error('Board is undefined');
  }
};
export const check = () => {};
