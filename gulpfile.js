var gulp = require('gulp'),
    chalk = require('chalk'),
    connect = require('connect'),
    serveStatic = require('serve-static'),
    browserify = require('browserify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream');

var PORT = process.env.PORT || 8080;

gulp.task('js', function () {
  browserify('./js/app.js')
  .transform(reactify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('server', ['js'], function () {
  connect()
    .use(serveStatic('./'))
    // .use(liveReload({ port: 35729 }))
    .listen(PORT)
    .on('listening', function () {
      console.log(chalk.green('Started dev server on http://localhost:' + PORT));
    });
});

gulp.task('watch', ['server'], function () {
  gulp.watch('./js/**', ['js']);
});

gulp.task('default', ['watch']);
