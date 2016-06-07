import videojs from 'video.js';

videojs.plugin('resumecard', (options) => {
  videojs.mergeOptions({}, options);
});
