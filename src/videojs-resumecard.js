import videojs from 'video.js';

import styles from './videojs-resumecard.scss';

let resumeCard = null;

class ResumeCard {
  constructor(player, options) {
    this.player = player;
    this.settings = videojs.mergeOptions({
      className: styles['vjs-resume-card'],
      classNameActionItem: styles['vjs-resume-card-action-item'],
      classNameActionList: styles['vjs-resume-card-action-list'],
      classNameButton: styles['vjs-resume-card-button'],
      classNameRestartButton: styles['vjs-resume-card-restart-button'],
      classNameResumeButton: styles['vjs-resume-card-resume-button'],
      id: 'vjs_resume_card',
      restartButtonText: 'Restart Video',
      resumeButtonText: 'Resume Video',
    }, options);

    resumeCard = null;
  }

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

  restartCallback(event) {
    const {
      restartCallback,
    } = this.settings;

    if (typeof restartCallback === 'function') {
      return restartCallback.call(this, event);
    }

    this.player.ready(() => {
      this.player.play();
    });

    this.hide();

    return undefined;
  }

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
        this.player.play();
      });

      this.player.currentTime(time);
    });

    this.hide();

    return undefined;
  }

  show() {
    if (resumeCard instanceof HTMLElement === false) {
      return;
    }

    resumeCard.style.display = 'block';
  }
}

videojs.plugin('resumecard', function resumecard(options) {
  (new ResumeCard(this, options)).render();
});
