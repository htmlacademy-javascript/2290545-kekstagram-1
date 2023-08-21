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

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastId = 0;

  return () => {
    lastId += 1;
    return lastId;
  };
};


const generatedCommentId = createIdGenerator ();

const createMessage = () =>
  Array.from({ length: getRandomInteger(1, 2)}, () =>
    getRandomArrayElement(COMMENT_LINES)
  ).join(' ');

const createComment = () => (
  {
    id: generatedCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  }

);

const createPicture = (index) => ({

  id: createIdGenerator(),
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  Comment: Array.from({
    length: getRandomInteger(0, COMMENT_COUNT)
  },
  createComment
  ),
});


const getPictures = () =>
  Array.from({ length: PICTURE_COUNT}, (_, pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

getPictures();
