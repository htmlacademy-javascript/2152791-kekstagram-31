const photoCount = 25;
const idCount = 30;
const idArray = [];
const urlArray = [];
const commentsIdArray = [];

const getRandomNumber = (min, max) => {
  const number = min + Math.random() * (max + 1 - min);

  return Math.floor(number);
};

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const generateRandomArrays = () => {
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
};
generateRandomArrays();

const getComments = () => {
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
};

const createPhoto = () => {
  const photoDescription = [
    'Волки рядятся в овечью шкуру ради своих шкурных интересов',
    'Запомните волчья ягода не из волков',
    'Волк слабее льва и тигра, но в цирке не выступает',
    'Я словно волк — всегда осторожный и в меру голодный',
    'Лучше один день прожить волком, чем 100 лет шакалом',
    'Бойся гнева терпеливого волка',
    'Волк чужого не ищет, волк довольствуется своим'
  ];

  return {
    id: idArray.shift(),
    url: `photos/${urlArray.shift()}.jpg`,
    description: photoDescription[getRandomNumber(0, 6)],
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 30)}, getComments)
  };
};

const photoArray = Array.from({length: photoCount}, createPhoto);
console.log(photoArray);
