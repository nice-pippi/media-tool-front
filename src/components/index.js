import CVideo from './CVideo';
import CAudio from './CAudio';
import CImage from './CImage';

export default {
  install(app) {
    app.component('CVideo', CVideo);
    app.component('CAudio', CAudio);
    app.component('CImage', CImage);
  },
};
