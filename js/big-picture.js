import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const comments = bigPicture.querySelector('.social__comments');
const liElement = comments.querySelector('li');

const onCloseButtonClick = () => {
  closeBigPicture();
};

const getShowMoreClickHandler = (comments) => {
  let commentsShowed = 0;
  const totalComments = comments.length;
  return () => {
    const startComment = commentsShowed;
    const showCommentsCount = Math.min(totalComments, commentsShowed + 5);
    for (let i = startComment; i < showCommentsCount; i++) {
      const { avatar, name, message } = comments[i];
      const newComment = liElement.cloneNode(true);

      const picture = newComment.querySelector('.social__picture');
      picture.src = avatar;
      picture.alt = name;

      newComment.querySelector('.social__text').textContent = message;
      commentsElement.append(newComment);

      commentsShowed++;
    }
    bigPicture.querySelector('.social__comment-count').innerHTML =
      `${commentsShowed} из <span class="comments-count">${totalComments}</span> комментариев`;
    if (commentsShowed === totalComments) {
      showMoreElement.classList.add('hidden');
    }
  };
};

let onShowMoreClick = () => {};



const onEscKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  closeButton.removeEventListener('click', onCloseButtonClick);
  document.removeEventListener('keydown', onEscKeyDown);
}

const fillComments = (photoComments) => {
  comments.innerHTML = '';
  for (const {avatar, name, message} of photoComments) {
    const newComment = liElement.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    comments.append(newComment);
  }
};

const fillTemplate = (photo) => {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  fillComments(photo.comments);
};

function showBigPicture(photo) {
  fillTemplate(photo);

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
}
function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  showMoreElement.removeEventListener('click', onShowMoreClick);
  document.removeEventListener('keydown', onEscKeyDown);
};

export { showBigPicture };
