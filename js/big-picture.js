import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsElement = bigPicture.querySelector('.social__comments');
const liElement = commentsElement.querySelector('li');
const commentsTotal = bigPicture.querySelector('.comments-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');

let commentsShown = 0;

const onCloseButtonClick = () => {
  closeBigPicture();
};

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

  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.replaceWith(commentsLoader.cloneNode(true));
}

function renderComment(comment) {
  const newComment = liElement.cloneNode(true);
  const picture = newComment.querySelector('.social__picture');
  picture.src = comment.avatar;
  picture.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsElement.append(newComment);
}

function fillComments(comments) {
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsTotal.textContent = comments.length;
  commentsElement.innerHTML = '';

  commentsShown = Math.min(comments.length, 5);
  commentsCount.childNodes[0].textContent = `${commentsShown} из `;

  comments.slice(0, commentsShown).forEach((comment) => {
    renderComment(comment);
  });

  if (comments.length > 5) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', () => {
      const commentsShownOld = commentsShown;
      commentsShown = Math.min(commentsShown + 5, comments.length);
      commentsCount.childNodes[0].textContent = `${commentsShown} из `;
      comments.slice(commentsShownOld, commentsShown).forEach((comment) => {
        renderComment(comment);
      });

      if (commentsShown >= comments.length) {
        commentsLoader.classList.add('hidden');
      }
    });
  }
}

function fillTemplate(photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent =
    photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;

  fillComments(photo.comments);
}

function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');
  fillTemplate(photo);

  closeButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
}

export { showBigPicture };
