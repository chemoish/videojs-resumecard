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

#### [className]

Type: `string`  
Default: `vjs-resumecard`  

HTMLElement class.

#### [id]

Type: `string`  
Default: `vjs_resumecard`  

HTMLElement id.

#### [preload]

Type: `boolean`
Default: `false`

Have the player *immediately* seek to time specified.

#### [restartCallback]

Type: `function(event)`  

Enables customization for the restart event.

#### [resumeCallback]

Type: `function(event)`  

Enables customization for the resume event.

#### template

Type: `function(restartCallback, resumeCallback):HTMLElement`  

Enables HTML customization for the template. **MUST return DOM Element**.

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
