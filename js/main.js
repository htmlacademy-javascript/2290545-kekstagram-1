import { createThumbnails } from './thumbnails.js';
import { getPictures } from './data.js';

createThumbnails(getPictures());

console.log('pictures:', getPictures());
