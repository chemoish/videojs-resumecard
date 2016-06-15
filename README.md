# videojs-resumecard

> Video.js plugin for resuming playback.

## Getting Started

#### Include

```html
<!-- optional: default styles -->
<link href="/path/to/videojs.resumecard.min.css" rel="stylesheet">

<script src="/path/to/videojs.resumecard.min.js"></script>
```

#### Enable

```js
videojs('player_id').resumecard({
  time: 42,
});
```
> Note: There are multiple ways to enable plugins. For more information, please visit [Video.js](https://github.com/videojs/video.js).

## Options

#### className

Type: `string`  
Default: `vjs-resume-card`  

#### classNameActionItem

Type: `string`  
Default: `vjs-resume-card-action-item`  

#### classNameActionList

Type: `string`  
Default: `vjs-resume-card-action-list`  

#### classNameButton

Type: `string`  
Default: `vjs-resume-card-button`  

#### classNameRestartButton

Type: `string`  
Default: `vjs-resume-card-restart-button`  

#### classNameResumeButton

Type: `string`  
Default: `vjs-resume-card-resume-button`  

#### getRestartButton

Type: `getRestartButton(restartCallback)`  
Default:

```html
<button class="vjs-resume-card-button vjs-resume-card-restart-button" type="button">Restart Video</button>
```

Enables HTML customization for the restart button. **MUST return DOM Element**.

#### getResumeButton

Type: `getResumeButton(resumeCallback)`  
Default:

```html
<button class="vjs-resume-card-button vjs-resume-card-resume-button" type="button">Resume Video</button>
```

Enables HTML customization for the resume button. **MUST return DOM Element**.

#### getTemplate

Type: `getTemplate(restartButton, resumeButton)`  
Default:

```html
<div class="vjs-resume-card" id="vjs_resume_card">
  <ul class="vjs-resume-card-action-list">
    <li class="vjs-resume-card-action-item">{{restartButton}}</li>
    <li class="vjs-resume-card-action-item">{{resumeButton}}</li>
  </ul>
</div>
```

Enables HTML customization for the template. **MUST return DOM Element**.

#### id

Type: `string`  
Default: `vjs_resume_card`  

#### restartButtonText

Type: `string`  
Default: `Restart Video`  

#### restartCallback

Type: `restartCallback(event)`  

Enables customization for the restart event.

#### resumeButtonText

Type: `string`  
Default: `Resume Video`  

#### resumeCallback

Type: `resumeCallback(event)`  

Enables customization for the resume event.

#### time

Type: `number`  

In seconds.

## Contributing + Example

```bash
npm install -g grunt-cli # only needed for contributing

npm install

npm start
```

## License

Code licensed under [The MIT License](https://github.com/chemoish/videojs-resumecard/blob/master/LICENSE).
