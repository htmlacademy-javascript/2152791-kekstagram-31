import {getRandomNumber, shuffleArray} from './utils.js';

const idArray = [];
const urlArray = [];
const commentsIdArray = [];
const photoCount = 25;
const idCount = 30;

function generateRandomArrays() {
  for (let i = 1; i <= photoCount; i++) {
    idArray.push(i);
    urlArray.push(i);
  }

  for (let i = 1; i <= idCount; i++) {
    commentsIdArray.push(i);
  }

  shuffleArray(idArray);
  shuffleArray(urlArray);
  shuffleArray(commentsIdArray);
}
generateRandomArrays();

function getComments() {
  const commentMessage = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  const names = [
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
    message: commentMessage[getRandomNumber(0, 5)],
    name: names[getRandomNumber(0, 5)]
  };
}

export {getComments, idArray, urlArray, photoCount};
