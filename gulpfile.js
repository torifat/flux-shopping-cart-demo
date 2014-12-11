var gulp = require('gulp'),
    chalk = require('chalk'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var PORT = process.env.PORT || 8080;

gulp.task('copy', function(){
  gulp.src('./src/index.html')
  .pipe(gulp.dest('./dist/'));
});

gulp.task('js', function () {
  browserify('./src/js/app.jsx')
  .transform(reactify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('server', ['copy', 'js'], function () {
  connect()
    .use(serveStatic('./dist/'))
    // .use(liveReload({ port: 35729 }))
    .listen(PORT)
    .on('listening', function () {
      console.log(chalk.green('Started dev server on http://localhost:' + PORT));
    });
});

gulp.task('watch', ['server'], function() {
  gulp.watch('./src/js/**', ['js']);
});

gulp.task('default', ['watch']);
