import { showBigPicture } from './big-picture.js';
import { createUniqueRandomIdGenerator, debounce } from './util.js';

const picturesContainer = document.querySelector('.pictures');
const filterButtons = document.querySelectorAll('.img-filters__button');
let photos = [];

const getThumbnailClickHandler = () => (evt) => {
  evt.preventDefault();
  const photoId = evt.target.parentNode.dataset.photoId;
  showBigPicture(photos.find((photo) => photo.id === parseInt(photoId, 10)));
};

const createThumbnail = (template,photo) => {
  const thumbnailElement = template.querySelector('.picture').cloneNode(true);
  thumbnailElement.dataset.photoId = photo.id;
  thumbnailElement.querySelector('.picture__img').src = photo.url;
  thumbnailElement.querySelector('.picture__likes').textContent = photo.likes;
  return thumbnailElement;
};

const createThumbnails = (photoList) => {
  const fragment = document.createDocumentFragment();
  const templateContent = document.querySelector('#picture').content;
  const onThumbnailClick = getThumbnailClickHandler();
  for (const photo of photoList) {
    const thumbnail = createThumbnail(templateContent, photo);
    thumbnail.addEventListener('click', onThumbnailClick);
    fragment.append(thumbnail);
  }

  picturesContainer.append(fragment);
};

const removeThumbnails = () => {
  document.querySelectorAll('a.picture').forEach((el) => el.remove());
};

const showDefaultPhotos = () => {
  removeThumbnails();
  createThumbnails(photos);
};

const showMostDiscussedPhotos = () => {
  removeThumbnails();
  createThumbnails(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
};

const showRandomPhotos = () => {
  const getRandomPhotoId = createUniqueRandomIdGenerator(0, photos.length - 1);
  const currentPhotos = [];
  for (let i = 0; i < 10; i++) {
    currentPhotos.push(photos[getRandomPhotoId()]);
  }
  removeThumbnails();
  createThumbnails(currentPhotos);
};

const toggleActiveFilter = (target) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  target.classList.add('img-filters__button--active');
};

const toggleThumbnails = debounce((target) => {
  if (target.id === 'filter-default') {
    showDefaultPhotos();
  } else if (target.id === 'filter-random') {
    showRandomPhotos();
  } else if (target.id === 'filter-discussed') {
    showMostDiscussedPhotos();
  }
});

const initThumbnails = (photoList) => {
  photos = photoList;

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');

  document.querySelector('.img-filters__form').addEventListener('click', (evt) => {
    toggleActiveFilter(evt.target);
    toggleThumbnails(evt.target);
  });

  showDefaultPhotos();
};


export { createThumbnails, initThumbnails };
