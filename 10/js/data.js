import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 20;
const COMMENT_LINES = [
  'В России могут собрать рекордный урожай пшеницы.',
  'Убрана почти половина площадей. По данным Совэкон, средняя урожайность остается значительно выше',
  'средней: 4,1 т/га против 3,8 т/га.',
];

const DESCRIPTIONS = [
  'Швейцария присоединилась к 11-му пакету санкций Евросоюза против России, следует из заявления',
  'опубликованного правительством страны.'

];

const NAMES = ['Petya', 'Vasya', 'Keks', 'Anton', 'Kenny', 'Trump'];

const generateCommentId = createIdGenerator ();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2)}, () =>
    getRandomArrayElement(COMMENT_LINES)
  ).join(' ');

const createComment = () => (
  {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  }

);

const generatePictureId = createIdGenerator();

const createPicture = (index) => ({

  id: generatePictureId(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from({
    length: getRandomInteger(0, COMMENT_COUNT)
  },
  createComment
  ),
});


const getPictures = () =>
  Array.from({ length: PICTURE_COUNT}, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

export { getPictures };
