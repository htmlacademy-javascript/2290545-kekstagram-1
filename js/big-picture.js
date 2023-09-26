import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const comments = bigPicture.querySelector('.social__comments');
const liElement = comments.querySelector('li');

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
}
const renderComments = () => {
  commentsShown += COMMENTS_PER_POSITION;

  if(commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentsElement = createComment(comments[i]);
    fragment.append(commentsElement);
  }

  commentList.innerHTML = ' ';
  commentList.append(fragment);
  commentsCount.innerHTML = `${commentsShown}`;
};

function fillComments(photoComments) {
  comments.innerHTML = '';
  for (const { avatar, name, message } of photoComments) {
    const newComment = liElement.cloneNode(true);
    const picture = newComment.querySelector('.social__picture');
    picture.src = avatar;
    picture.alt = name;
    newComment.querySelector('.social__text').textContent = message;
    comments.append(newComment);
  }
}

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

export { showBigPicture };
