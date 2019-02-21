GULP configuration guide
=====================

1. Create project folder


2. Install `gulp` globally:
`npm install --global gulp`


3. In the project folder run in terminal:

`npm init`

It will create package.json file, which includes all the information about the project


4. Install `gulp` locally in the project folder:

`npm install gulp --save-dev`

`--save-dev` - add the record to the package.json about gulp in the devDependencies section

After that node_modules folder will be created in the project folder.


5. In the root directory create file gulpfile.js. Write in it:

```js
var gulp = require('gulp')
```

This line attaches `gulp` module from 'npm-modules' folder and write it into the variable `gulp`


6. Now we may add our instructions below in the following format:

```js
gulp.task('mytask', function () {
  return gulp.src('source-files') // choosing source files for processing
    .pipe(plugin()) // envocation `gulp` plugin for processing file
    .pipe(gulp.dest('folder')) // output result file into the destination folder
})
```


7. Install `gulp-sass`:

`npm i gulp-sass --save-dev`


8. Connect `gulp-sass` to the project in gulpfile.js, adding the following line:

```js
var sass = require('gulp-sass')
```


9. After that we can run sass processor the using the following lines in gulpfile.js:

```js
gulp.task('sass', function() {
  gulp.src('src/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
});
```

It will convert our styles.scss file into styles.css file and put it in the destination folder `build/css`.


10. Now apply it not to only one file, using  wildcard characters and expressions:

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


11. `gulp` has method `watch` for watching changes in the project. It is used in the following way:

```js
gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
```

* watch-files - path to the files which should be watched
* ['task1', ...] - tasks that should be envoced if the files has changed

Also we may create separate task for watching changes:

```js
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));; // for watching .sass files
    // other watchers
});
```


12. For reloading pages after changing source files connect `browser-sync`

`npm i browser-sync --save-dev`


13. Add browser-sync package library:

```js
var browserSync = require('browser-sync');
```


14. Create task for `browser-sync`:

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


16. Add one more line to task 'sass' for automatic reloading browser after changes:

```js
gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({stream: true})) // line for reloading browser
});
```


17. Add similar to `task` directive for `html`:

```js
gulp.task('html', function() {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}))
});
```

In this case we just copy html from `src` to `build`.


18. Create a task 'default' for describing sequense of steps for command `gulp`:

```js
gulp.task('default', gulp.parallel('watch', 'sass', 'html', 'browser-sync'))
```


19. Refresh task `watch` adding watching html changes:

```js
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/index.html', gulp.parallel('html'));
})
```


20. For processing and minifying .js files at first install `gulp-concat` and `gulp-uglifyjs`: // installing jquery and magnific-popup - not sure that we need it

`bower i jquery magnific-popup`


21. For processing and minifying .js files at first install `gulp-concat` and `gulp-uglifyjs`:

`npm i --save-dev gulp-concat gulp-uglifyjs`


22. Connect libraries to the `gulpfile.js`:

```js
var concat = require('gulp-concat'); // for files concatenation 
var uglify = require('gulp-uglifyjs'); // for compressing .js
```


23. Add task `scripts` for concatenation and compressing `.js` files:

```js
gulp.task('scripts', function() {
  return gulp.src('src/js/** /*.js')
    .pipe(concat('index.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
	  .pipe(browserSync.reload({stream: true}))
});
```


24. Add line for `scripts` to `watch` task:

```js
gulp.task('watch', function() {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/index.html', gulp.parallel('html'));
  gulp.watch('src/js/**/*.js', gulp.parallel('scripts'));
})
```


25. Add task to the `default` task list:

```js
gulp.task('default', gulp.parallel('watch', 'sass', 'html', 'scripts', 'browser-sync'))
```


** BASIC GULP IS READY FOR USE **
