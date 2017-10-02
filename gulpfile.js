var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var file = require('gulp-file');
var mkdirp = require('mkdirp');
var replace = require('gulp-replace');
var fileinclude = require('gulp-file-include');
var clean = require('gulp-clean');
var gulpSequence = require('gulp-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var gulpImports = require('gulp-imports');
var babel = require('gulp-babel');
/****************************************************************
/ path settings
*****************************************************************/
var path ={
  node:'./node_modules/',
  dev:'source/',
  build:'build/',
  vendor:'vendor/',
  less:'less/',
  css:'css/',
  js:'js/',
  img:'img/',
};


/****************************************************************
/ Js files
*****************************************************************/
gulp.task('js', function(){
    return gulp.src([
        path.node+'/jquery/dist/jquery.min.js',
        path.dev+path.js+'*.js'
    ])
            .pipe(concat('script.js'))
            .pipe(gulpImports())
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest(path.build))
            .pipe(reload({stream:true}));   
})


/****************************************************************
/ Less
*****************************************************************/
gulp.task('less', function() {
    return gulp.src( path.dev + path.css + 'style.less' )
            .pipe(less({}))
            .pipe(autoprefixer())
            .pipe(uglifycss())
            .pipe(gulp.dest(path.build))
            .pipe(reload({stream:true}));
});


/****************************************************************
/ HTML
*****************************************************************/
gulp.task('html', function() {
  return gulp.src([
                   path.dev + '**/*.html',
                   path.dev + '*.html',
                   '!'+path.dev+'header.html',
                   '!'+path.dev+'footer.html',
                 ])
            .pipe(fileinclude({ prefix: '@@', basepath: path.dev}))
            .pipe(gulp.dest(path.build))
            .pipe(reload({stream:true}));
});


/****************************************************************
/ Static Server + watching files + live reload
*****************************************************************/
gulp.task('browser-sync', ['html','less','js'], function() {
    browserSync.init({
        //proxy: "dev/",
        server: {baseDir: path.build},
        injectChanges: true,
        open: false,
        snippetOptions: {
            ignorePaths: "index.html",
            rule: {
                match: /<\/body>|<!--(?:\[\/sync\])-->/i,
                fn: function (snippet, match) {
                    return snippet + match;
                }
            }
        }
    });
    gulp.watch( path.dev + path.css + '*.less' , ['less']);
    gulp.watch( path.dev + path.js + "*.js", ['js']);
    gulp.watch( [path.dev+"**/*.html", path.dev+"*.html"], ['html']);
});

/****************************************************************
/ Build project
*****************************************************************/
gulp.task('build', ['cleanBuild'], function () {
return gulp.src([path.dev + path.img +'*'])
          .pipe(gulp.dest(path.build+path.img)),

       gulp.src([path.dev +'projects/img/*.png'])
          .pipe(gulp.dest(path.build+path.img+'projects/')),         
          
       gulp.src([path.node +'font-awesome/fonts/*'])
          .pipe(gulp.dest(path.build +'fonts/'));

});

gulp.task('cleanBuild', function () {
  return gulp.src(path.build)
      .pipe(clean());
});

/****************************************************************
/ remove <!--[sync]--><!--[/sync]-->
*****************************************************************/
gulp.task('clean', function () {
  gulp.src([path.build +'*.html' ])
      .pipe(replace('<!--[sync]-->',''))
      .pipe(replace('<!--[/sync]-->',''))
      .pipe(gulp.dest(path.build));

});

/****************************************************************
/ default Tasks (gulp)
*****************************************************************/
gulp.task('default', gulpSequence(['build'], ['browser-sync']));