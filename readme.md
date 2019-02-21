GULP configuration guide
=====================

### 1. Create project folder


### 2. Install `gulp` globally:
`npm install --global gulp`


### 3. In the project folder run in terminal:

`npm init`

It will create `package.json`, which includes all the information about the project


### 4. Install `gulp` locally in the project folder:

`npm install gulp --save-dev`

`--save-dev` - add the record to the `package.json` about gulp in the devDependencies section

After that node_modules folder will be created in the project folder.


### 5. In the root directory create file `gulpfile.js`. Write in it:

```js
var gulp = require('gulp')
```

This line attaches `gulp` module from `npm-modules` folder and write it into the variable `gulp`



### 6. Now we may add our instructions below in the following format:

```js
gulp.task('mytask', function () {
  return gulp.src('source-files') // choosing source files for processing
    .pipe(plugin()) // envocation `gulp` plugin for processing file
    .pipe(gulp.dest('folder')) // output result file into the destination folder
})
```


### 7. Install `gulp-sass`:

`npm i gulp-sass --save-dev`



### 8. Connect `gulp-sass` to the project in `gulpfile.js`, adding the following line:

```js
var sass = require('gulp-sass')
```


### 9. After that we can run sass processor the using the following lines in `gulpfile.js`:

```js
gulp.task('sass', function() {
  gulp.src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
});
```

It will convert our styles.scss file into styles.css file and put it in the destination folder `build/css`.



### 10. Now apply it not to only one file, using  wildcard characters and expressions:

* `*.sass` — chose all .sass files in the current directory
* `** /*.js` — choose all .js files in all folders
* `!header.sass` — exclude the file from the list
* `*.+(scss|sass)` - use more than one types of files

So, change our commands to the following:

```js
gulp.task('sass', function() {
  gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
});
```

If the name of the file start with _ (`_header.scss`) it won't be compiled and such file has to be imported to the main.scss as it's part.



### 11. `gulp` has method `watch` for watching changes in the project. It is used in the following way:

```js
gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
```

* watch-files - path to the files which should be watched
* ['task1', ...] - tasks that should be envoced if the files has changed

Also we may create separate task for watching changes:

```js
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
    // other watchers
});
```


### 12. For reloading pages after changing source files connect `browser-sync`

`npm i browser-sync --save-dev`



### 13. Add browser-sync package library:

```js
var browserSync = require('browser-sync');
```


### 14. Create task for `browser-sync`:

```js
gulp.task('browser-sync', function() {
  browserSync({
    // define the parameters for server
    server: {
      baseDir: 'build' // directory for server (final directory of ready project, usually with index.html)
    },
    notify: false // turn off notifications
  })
})
```


### 15. Add one more line to task `sass` for automatic reloading browser after changes:

```js
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true})) // line for reloading browser
});
```


### 16. Add similar lines to task `html`:

```js
gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
});
```

In this case we just copy html from `src` to `build`.


### 17. Create a task `default` for describing sequense of steps for command `gulp`:

```js
gulp.task('default', gulp.parallel('watch', 'sass', 'html', 'browser-sync'))
```


### 18. Refresh task `watch` adding watching `.html` changes:

```js
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/index.html', gulp.parallel('html'));
})
```


### 19. For processing and minifying `.js` files at first install `gulp-concat` and `gulp-uglifyjs`:

`npm i --save-dev gulp-concat gulp-uglifyjs`



### 20. Connect libraries to the `gulpfile.js`:

```js
var concat = require('gulp-concat'); // for files concatenation 
var uglify = require('gulp-uglifyjs'); // for compressing .js
```


### 21. Add task `scripts` for concatenation and compressing `.js` files:

```js
gulp.task('scripts', function() {
  return gulp.src('src/js/** /*.js')
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
	  .pipe(browserSync.reload({stream: true}))
});
```


### 22. Add line for `scripts` to `watch` task:

```js
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/index.html', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
})
```


### 23. Add task to the `default` task list:

```js
gulp.task('default', gulp.parallel('watch', 'sass', 'html', 'scripts', 'browser-sync'))
```


### 24. Add to `package.json` information about the repository of the project (optionally):

```js
"repository": {
  "type": "git",
  "url": "git://github.com/username/repository.git"
}
```

### 25. Add short command to `package.json` for starting project as the following:

```js
"scripts": {
  ...
  "start": "gulp"
}
```


** BASIC GULP IS READY FOR USE !!! **




ESLINT configuration
=====================


### 1. Install `eslint` package globally (or locally):

`npm install -g eslint --save-dev`



### 2. Setup a configuration file:

`./node_modules/.bin/eslint --init`

After that answer the questions about your wishable configuration



### 3. Install `airbnb` configuration globally (or locally):

`npx install-peerdeps --dev eslint-config-airbnb`



### 4. Create file .eslintignore in the root directory with the following content:

```js
/.git
/.vscode
node_modules
```


### 5. Now we're already able to run `eslint` by command:

`./node_modules/.bin/eslint index.js`

`index.js` - file for checking



### 6. Add `script` command in `package.json` for easy running `eslint`:

```js
"scripts": {
  ...
  "lint": "eslint src/"
}
```


### 7. Install `pre-commit` for ability to run some tasks before commiting:

`npm install --save-dev pre-commit`



### 8. Add `pre-commit` in `package.json` (as array):

```js
"pre-commit": [
  "lint"
]
```

** ESLINT IS READY FOR USE !!! **