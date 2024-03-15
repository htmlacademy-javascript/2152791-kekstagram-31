import {getRandomNumber} from './utils.js';
import {getComments, idArray, urlArray, photoCount} from './generators.js';

function createPhoto() {
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
}

const photoArray = Array.from({length: photoCount}, createPhoto);

export {photoArray};
