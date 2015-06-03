# angularjs-requirejs-rjs-md5

[中文说明在这里。](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/README.zh-CN.md)

A boilerplate for [angularjs](https://angularjs.org/). It use [requirejs](http://requirejs.org/) to lazyload controllers, filters, directives...and so on, then use [r.js](https://github.com/jrburke/r.js/) to suitable combine these files as modules and compress them , finally use [gulp-rev-all](https://github.com/smysnk/gulp-rev-all) to rename these files to a md5 filename.

All of these operations only need one command: `gulp`. 

[Online preview is here.](http://lmk123.github.io/angularjs-requirejs-rjs-md5/cdn/) User your network panel from dev tool to check the files load status.

### How dose it lazyload controllers (or filters, directives and so on)?
See [app/bootstrap.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/app/bootstrap.js).

### How dose it use gulp to handle files?
The `gulp` command has follow steps:

1. Use r.js to combine files from [`app`](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/app) and output to `build-requirejs`;
2. Compress files form `build-requirejs` folder to `build` folder;
3. Then use gulp-rev-all to rename files to a md5 filename from `build` and output to [`cdn`](https://github.com/lmk123/angularjs-requirejs-rjs-md5/tree/master/cdn).

See [gulpfile.js](https://github.com/lmk123/angularjs-requirejs-rjs-md5/blob/master/gulpfile.js) for more infomation.

### Use E2E Test
Install [protractor](http://angular.github.io/protractor), then run `npm test`.

### License
MIT
