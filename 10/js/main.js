import { createThumbnails } from './thumbnails.js';
import { getPictures } from './data.js';
import { configureUploadImageForm } from './form.js';

createThumbnails(getPictures());
configureUploadImageForm();

