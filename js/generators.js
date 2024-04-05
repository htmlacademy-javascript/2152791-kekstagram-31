import {getRandomNumber, shuffleArray} from './utils.js';

const PHOTO_COUNT = 25;
const ID_COUNT = 30;
const idArray = [];
const urlArray = [];
const commentsIdArray = [];

function generateRandomArrays() {
  for (let i = 1; i <= PHOTO_COUNT; i++) {
    idArray.push(i);
    urlArray.push(i);
  }

  for (let i = 1; i <= ID_COUNT; i++) {
    commentsIdArray.push(i);
  }

  shuffleArray(idArray);
  shuffleArray(urlArray);
  shuffleArray(commentsIdArray);
}
generateRandomArrays();

function getComments() {
  const CommentMessages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const CommentNames = [
    'Тимофей',
    'Майя',
    'Иван',
    'Рита',
    'Антонина',
    'Анна',
  ];

  return {
    id: commentsIdArray.shift(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: CommentMessages[getRandomNumber(0, 5)],
    name: CommentNames[getRandomNumber(0, 5)]
  };
}

export {getComments, idArray, urlArray, PHOTO_COUNT};
