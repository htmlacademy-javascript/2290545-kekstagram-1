import { onEscKeyDown,isEscapeKey } from './util.js';
import {initScaler, resetScale} from './scaler.js';
import { initEffects, resetEffects } from './effects.js';
import { uploadPhoto } from './api.js';
import { showErrorModal, showSuccessModal } from './modal.js';

const uploadImageInput = document.querySelector('#upload-file');
const uploadImageOverlay = document.querySelector('.img-upload__overlay');
const uploadImageForm = document.querySelector('#upload-select-image');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const imageUploadPreview = document.querySelector('.img-upload__preview > img');
const formSubmitButton = document.querySelector('#upload-submit');

const pristine = new Pristine(uploadImageForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error',
});

const onImageLoadCloseClick = () => {
  closeImageLoadModal();
};

const onImageLoadEscKeyDown = (evt) => onEscKeyDown(evt, closeImageLoadModal);


const onInputKeyDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const blockSubmitButton = () => {
  formSubmitButton.textContent = 'Отправка...';
  formSubmitButton.disabled = true;
};

const unblockSubmitButton = () => {
  formSubmitButton.textContent = 'Опубликовать';
  formSubmitButton.disabled = false;
};

function closeImageLoadModal () {
  uploadImageForm.reset();

  document.body.classList.remove('modal-open');
  uploadImageOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onImageLoadEscKeyDown);
}

const onImageSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    uploadPhoto(new FormData(evt.target))
      .then(() => {
        showSuccessModal();
        closeImageLoadModal();
      })
      .catch(() => {
        document.removeEventListener('keydown', onImageLoadEscKeyDown);
        showErrorModal(onImageLoadEscKeyDown);
      })
      .finally(unblockSubmitButton);
  }
};

const validateHashtag = (hashtag) => new RegExp('^#[а-яёa-z0-9]{1,19}$').test(hashtag);

const hashtagsIsUnique = (hashTags) => {
  const uniqueTags = new Set(hashTags);
  return uniqueTags.size === hashTags.length;
};

const validateHashtags = (value) => {
  const hashtags = value?.toLowerCase().split(' ').filter((tag) => tag !== '');
  return hashtags.length <= 5 && hashtagsIsUnique(hashtags) && hashtags.every(validateHashtag);
};

const onImageSelect = () => {
  uploadImageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  const reader = new FileReader();
  reader.onload = function(event) {
    imageUploadPreview.src = event.target.result;
  };
  reader.readAsDataURL(uploadImageInput.files[0]);

  resetScale();
  resetEffects();

  const uploadCancelBotton = document.querySelector('#upload-cancel');
  uploadCancelBotton.addEventListener('click', onImageLoadCloseClick);
  document.addEventListener('keydown', onImageLoadEscKeyDown);
};


const configureUploadImageForm = () => {
  uploadImageInput.addEventListener('change', onImageSelect);
  uploadImageForm.addEventListener('submit', onImageSubmit);
  hashtagInput.addEventListener('keydown', onInputKeyDown);
  commentInput.addEventListener('keydown', onInputKeyDown);

  pristine.addValidator(hashtagInput, validateHashtags, 'Неверный формат хэштэгов');

  initScaler();
  initEffects();

};

function closeImageLoadModal () {
  uploadImageForm.reset();
  document.body.classList.remove('modal-open');
  uploadImageOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onImageLoadEscKeyDown);
}

export { configureUploadImageForm };
