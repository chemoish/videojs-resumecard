/* global videojs */

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
 * @param {Object} [options.className=vjs-resume-card]
 * @param {Object} [options.classNameActionItem=vjs-resume-card-action-item]
 * @param {Object} [options.classNameActionList=vjs-resume-card-action-list]
 * @param {Object} [options.classNameButton=vjs-resume-card-button]
 * @param {Object} [options.classNameRestartButton=vjs-resume-card-restart-button]
 * @param {Object} [options.classNameResumeButton=vjs-resume-card-resume-button]
 * @param {Object} [options.id=vjs_resume_card]
 * @param {Object} [options.restartButtonText=Restart Video]
 * @param {Object} [options.resumeButtonText=Resume Video]
 * @param {getRestartButton} [options.getRestartButton]
 * @param {getResumeButton} [options.getResumeButton]
 * @param {getTemplate} [options.getTemplate]
 * @param {restartCallback} [options.restartCallback]
 * @param {resumeCallback} [options.resumeCallback]
 */
class ResumeCard {
  constructor(player, options = {}) {
    if (!options.time) {
      throw new Error('videojs-resumecard requires a resume time.');
    }

    this.player = player;
    this.settings = videojs.mergeOptions({
      className: 'vjs-resume-card',
      classNameActionItem: 'vjs-resume-card-action-item',
      classNameActionList: 'vjs-resume-card-action-list',
      classNameButton: 'vjs-resume-card-button',
      classNameRestartButton: 'vjs-resume-card-restart-button',
      classNameResumeButton: 'vjs-resume-card-resume-button',
      id: 'vjs_resume_card',
      restartButtonText: 'Restart Video',
      resumeButtonText: 'Resume Video',
    }, options);

    resumeCard = null;
  }

  fade() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.opacity = 0;
  }

  /**
   * Generates a restart button.
   *
   * @callback getRestartButton
   * @param {restartCallback} callback
   * @returns {HTMLElement} restartButton
   */
  getRestartButton(callback) {
    const {
      classNameButton,
      classNameRestartButton,
      getRestartButton,
      restartButtonText,
    } = this.settings;

    let restartButton;

    if (typeof getRestartButton === 'function') {
      restartButton = getRestartButton.call(this, callback);

      if (restartButton instanceof HTMLElement) {
        return restartButton;
      }
    }

    restartButton = document.createElement('button');

    restartButton.className = [
      classNameButton,
      classNameRestartButton,
    ].join(' ');
    restartButton.innerText = restartButtonText;
    restartButton.onclick = callback;
    restartButton.type = 'button';

    return restartButton;
  }

  /**
   * Generates a resume button.
   *
   * @callback getResumeButton
   * @param {resumeCallback} callback
   * @returns {HTMLElement} resumeButton
   */
  getResumeButton(callback) {
    const {
      classNameButton,
      classNameResumeButton,
      getResumeButton,
      resumeButtonText,
    } = this.settings;

    let resumeButton;

    if (typeof getResumeButton === 'function') {
      resumeButton = getResumeButton.call(this, callback);

      if (resumeButton instanceof HTMLElement) {
        return resumeButton;
      }
    }

    resumeButton = document.createElement('button');

    resumeButton.className = [
      classNameButton,
      classNameResumeButton,
    ].join(' ');
    resumeButton.innerText = resumeButtonText;
    resumeButton.onclick = callback;
    resumeButton.type = 'button';

    return resumeButton;
  }

  /**
   * Generates the resume card template.
   *
   * @callback getTemplate
   * @param {HTMLElement} restartButton
   * @param {HTMLElement} resumeButton
   * @returns {HTMLElement} template
   */
  getTemplate(restartButton, resumeButton) {
    const {
      className,
      classNameActionItem,
      classNameActionList,
      getTemplate,
      id,
    } = this.settings;

    let template;

    if (typeof getTemplate === 'function') {
      template = getTemplate.apply(this, [restartButton, resumeButton]);

      if (template instanceof HTMLElement) {
        return template;
      }
    }

    template = document.createElement('div');

    template.className = className;
    template.id = id;

    const actionList = document.createElement('ul');

    actionList.className = classNameActionList;

    const actionItemRestart = document.createElement('li');

    actionItemRestart.className = classNameActionItem;
    actionItemRestart.appendChild(restartButton);

    const actionItemResume = document.createElement('li');

    actionItemResume.className = classNameActionItem;
    actionItemResume.appendChild(resumeButton);

    actionList.appendChild(actionItemRestart);
    actionList.appendChild(actionItemResume);

    template.appendChild(actionList);

    return template;
  }

  hide() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.display = 'none';
  }

  render() {
    const restartButton = this.getRestartButton(this.restartCallback.bind(this));
    const resumeButton = this.getResumeButton(this.resumeCallback.bind(this));

    resumeCard = this.getTemplate(restartButton, resumeButton);

    this.player.el().appendChild(resumeCard);

    this.show();
  }

  /**
   * Executes the callback on restartButton interaction.
   *
   * @callback restartCallback
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
      this.hide();

      this.player.play();
    });

    return undefined;
  }

  /**
   * Executes the callback on resumeButton interaction.
   *
   * @callback resumeCallback
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
