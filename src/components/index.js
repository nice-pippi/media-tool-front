import CVideo from './CVideo';
import CAudio from './CAudio';
import CImage from './CImage';
import CItem from './CItem';

export default {
  install(app) {
    app.component('CVideo', CVideo);
    app.component('CAudio', CAudio);
    app.component('CImage', CImage);
    app.component('CItem', CItem);
  },
};
