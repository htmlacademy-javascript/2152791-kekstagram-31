const getRandomNumber = (min, max) => {
  const number = min + Math.random() * (max + 1 - min);

  return Math.floor(number);
};

const shuffleArray = (array) => {
  array.sort(() => Math.random() - 0.5);
};

const getComments = () => {
  const commentsIdArray = [];
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

  for (let i = 1; i <= 30; i++) {
    commentsIdArray.push(i);
  }
  shuffleArray(commentsIdArray);

  return {
    id: commentsIdArray.pop(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: commentMessage[getRandomNumber(0, 5)],
    name: names[getRandomNumber(0, 5)]
  };
};

const createPhoto = () => {
  const idArray = [];
  const urlArray = [];
  const photoDescription = [
    'Волки рядятся в овечью шкуру ради своих шкурных интересов',
    'Запомните волчья ягода не из волков',
    'Волк слабее льва и тигра, но в цирке не выступает',
    'Я словно волк — всегда осторожный и в меру голодный',
    'Лучше один день прожить волком, чем 100 лет шакалом',
    'Бойся гнева терпеливого волка',
    'Волк чужого не ищет, волк довольствуется своим'
  ];

  for (let i = 1; i <= 25; i++) {
    idArray.push(i);
  }
  shuffleArray(idArray);

  for (let i = 1; i <= 25; i++) {
    urlArray.push(i);
  }
  shuffleArray(urlArray);

  return {
    id: idArray.pop(),
    url: `photos/${urlArray.pop()}.jpg`,
    description: photoDescription[getRandomNumber(0, 9)],
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: getRandomNumber(0, 30)}, getComments)
  };
};

const photoArray = Array.from({length: 25}, createPhoto);
