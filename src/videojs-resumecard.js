/* global videojs */
/* eslint-disable max-len */

import './videojs-resumecard.scss';

let resumeCard = null;

/**
 * Video.js plugin for resuming playback.
 *
 * @example
 * videojs('player_id', {
 *   plugins: {
 *     resumecard: {
 *       time: 42,
 *
 *       template: function template() {
 *         // ...
 *       }
 *     },
 *   },
 * });
 *
 * videojs('player_id').resumecard({
 *   time: 42,
 * });
 *
 * @param {Object} player VideoJS player
 * @param {Object} options={}
 * @param {string} [options.className=vjs-resumecard] HTMLElement class.
 * @param {string} [options.id=vjs_resumecard] HTMLElement id.
 * @param {boolean} [options.preload] Have the player *immediately* seek to time specified.
 * @param {function(event)} [options.restartCallback] Custom restart button callback.
 * @param {function(event)} [options.resumeCallback] Custom resume button callback.
 * @param {function(restartCallback, resumeCallback):HTMLElement} options.template Callback to return custom template HTMLElement.
 * @param {number} options.time Start time, in seconds, for the contented to be resumed.
 */
class ResumeCard {
  constructor(player, options = {}) {
    if (!options.time) {
      throw new Error('videojs-resumecard requires a valid time.');
    }

    if (!options.template) {
      throw new Error('videojs-resumecard requires a valid template.');
    }

    // hide big play button since resume card will take over initial play experience
    if (player.bigPlayButton) {
      player.bigPlayButton.hide();
    }

    // seek immediately on preload
    if (options.preload === true) {
      player.currentTime(options.time);
    }

    this.player = player;
    this.settings = videojs.mergeOptions({
      className: 'vjs-resumecard',
      id: 'vjs_resumecard',
    }, options);

    this.restartCallback = this.restartCallback.bind(this);
    this.resumeCallback = this.resumeCallback.bind(this);

    resumeCard = null;
  }

  fade() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.opacity = 0;
  }

  hide() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.display = 'none';
  }

  render() {
    const {
      className,
      id,
      template,
    } = this.settings;

    resumeCard = document.createElement('div');
    resumeCard.className = className;
    resumeCard.id = id;

    if (typeof template !== 'function') {
      this.player.el().appendChild(resumeCard);
    }

    const resumeCardTemplate = template(
      this.restartCallback,
      this.resumeCallback
    );

    if (resumeCardTemplate instanceof HTMLElement === false) {
      throw new Error('videojs-resumecard requires template to be a valid HTMLElement.');
    }

    resumeCard.appendChild(resumeCardTemplate);

    this.player.el().appendChild(resumeCard);

    this.show();
  }

  /**
   * Executes the callback on restartButton interaction.
   *
   * @param {Object} event
   */
  restartCallback(event) {
    const {
      restartCallback,
    } = this.settings;

    if (typeof restartCallback === 'function') {
      return restartCallback.call(this, event);
    }

    this.player.ready(() => {
      this.player.one('seeked', () => {
        this.hide();

        this.player.play();
      });

      this.player.currentTime(0);

      // visually hide resumecard, but prevent player interaction while video loads.
      this.fade();
    });

    return undefined;
  }

  /**
   * Executes the callback on resumeButton interaction.
   *
   * @param {Object} event
   */
  resumeCallback(event) {
    const {
      resumeCallback,
      time,
    } = this.settings;

    if (typeof resumeCallback === 'function') {
      return resumeCallback.call(this, event);
    }

    this.player.ready(() => {
      this.player.one('seeked', () => {
        this.hide();

        this.player.play();
      });

      this.player.currentTime(time);

      // visually hide resumecard, but prevent player interaction while video loads.
      this.fade();
    });

    return undefined;
  }

  show() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.display = 'block';
  }
}

function resumecard(options) {
  (new ResumeCard(this, options)).render();
}

videojs.plugin('resumecard', resumecard);

export default resumecard;
