import moment from 'moment';

export const timeFromCreation = (createdAt) => {
  const created = moment(createdAt);
  const currTime = moment();
  const diff = currTime.diff(created, 'seconds');
  return diff;
};

export const getTimeLeft = (game) => {
  const { createdAt, duration } = game;
  const timeElapsed = timeFromCreation(createdAt);

  const timeLeft = duration - timeElapsed;
  return timeLeft;
};
