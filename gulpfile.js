'use strict';
var _           = require('lodash');
var gulp        = require('gulp-help')(require('gulp'));
var $           = require('gulp-load-plugins')({lazy: true});
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var runSequence = require('run-sequence');
var merge       = require('merge2');
var args        = require('yargs').argv;
var notifier    = require('node-notifier');
var del         = require('del');
var browserSync = require('browser-sync');
var wiredep     = require('wiredep')(/*{exclude: ['bootstrap.js']}*/);
var watchify    = require('watchify');
var browserify  = require('browserify');
var tsify       = require('tsify');

process.setMaxListeners(0);    // Disable max listeners for gulp

var isVerbose = args.verbose;  // Enable extra verbose logging
var isProduction = args.prod;  // Run extra steps (minification) with production flag --prod
var isWatching = false;        // Enable/disable tasks when running watch
var tsWatchifyBundler;         // TypeScript watchify bundler stream

/************************************************************************
 * Clean temporary folders and files
 */

gulp.task('clean-build', false, function(cb) {
    del(['.tmp', 'dist'], cb);
});

gulp.task('clean-coverage', false, function(cb) {
    del(['coverage'], cb);
});

gulp.task('clean', 'Remove all temporary files', ['clean-build', 'clean-coverage']);

/************************************************************************
 * JavaScript tasks
 */

gulp.task('lint-js', false, function() {
    return gulp.src('src/**/*.ts')
        .pipe($.plumber({errorHandler: onError}))
        .pipe(verbosePrintFiles('lint-js'))
        .pipe($.tslint())
        .pipe($.tslint.report('prose'));
});

gulp.task('vendor-js', false, function() {
    var destDir  = 'dist/js';
    var destFile = 'vendor.js';
    return gulp
        .src([].concat(wiredep.js))
        .pipe($.newer(destDir + '/' + destFile))
        .pipe(verbosePrintFiles('vendor-js'))
        .pipe($.concat(destFile))
        .pipe($.if(isProduction, $.sourcemaps.init()))
        .pipe($.if(isProduction, $.uglify({preserveComments: 'some'})))
        .pipe($.if(isProduction, $.sourcemaps.write('.')))
        .pipe(gulp.dest(destDir));
});

//
// browserify/watchify example
//

gulp.task('app-js', false, function() {
    return addJsProcessing(
        browserify({debug: true})
            .require('./src/main.ts', {entry: true})
            .plugin(tsify, {target: 'ES5'})
            .bundle()
    );
});

function addJsProcessing(stream) {
    var destDir  = 'dist/js';
    var destFile = 'main.js';
    return stream
        .on('error', onError.bind(gulp))
        .pipe(source(destFile))
        .pipe(buffer())
        .pipe(verbosePrintFiles('app-js'))
        .pipe($.if(isProduction, $.sourcemaps.init({loadMaps: true})))
        .pipe($.ngAnnotate({'single_quotes': true}))
        .pipe($.if(isProduction, $.uglify()))
        .pipe($.if(isProduction, $.sourcemaps.write('.')))
        .pipe(gulp.dest(destDir))
        .pipe(browserSync.reload({stream:true}));
}

function bundleTs() {
    tsWatchifyBundler = tsWatchifyBundler || watchify(
            browserify('./src/main.ts', {
                entry: true,
                cache: {},
                packageCache: {},
                fullPaths: false,
                debug: true
            }).plugin(tsify, {target: 'ES5'})
        )
        .on('update', bundleTs)
        .on('log', (isVerbose) ? $.util.log : $.util.noop);

    return addJsProcessing(tsWatchifyBundler.bundle());
}

//
// gulp-typescript example
//
// More straightforward to wire up to grunt than browserify,
// but much slower...

//var tsProject = $.typescript.createProject({
//    declarationFiles: false,
//    noExternalResolve: true,
//    sortOutput: true,
//    target: 'ES5',
//    // module: null,       // Client-side Internal module references
//    // module: 'amd',
//    // module: 'commonjs',
//    sourceRoot: '../../src'
//});
//
//gulp.task('app-js', false, function() {
//    var tsResult = gulp.src(['src/**/*.ts', 'typings/**/*.ts'])
//        .pipe(verbosePrintFiles('app-js'))
//        .pipe($.if(isProduction, $.sourcemaps.init()))
//        .pipe($.typescript(tsProject));
//
//    // Merge the two output streams, finishes when the IO of both operations are done.
//    return merge([
//        tsResult.dts
//            .pipe(gulp.dest('dist/defs')),
//        tsResult.js
//            .pipe($.concat('main.js'))
//            .pipe($.ngAnnotate({'single_quotes': true}))
//            .pipe($.if(isProduction, $.uglify()))
//            .pipe($.if(isProduction, $.stripDebug()))
//            .pipe($.if(isProduction, $.sourcemaps.write('.')))
//            .pipe(gulp.dest('dist/js'))
//    ]);
//});

/************************************************************************
 * LESS (and other assets) tasks
 */

// Custom bootstrap/font-awesome builds
var mainCssFiles = [{
    main: 'src/styles/bootstrap.less',
    searchPaths: ['src/styles', 'bower_components/bootstrap/less', 'bower_components/bootstrap-social']
}, {
    main: 'src/styles/font-awesome.less',
    searchPaths: ['src/styles', 'bower_components/font-awesome/less']
}, {
    main: 'bower_components/angular/angular-csp.css'
}];

// Too buggy to use with bootstrap
//gulp.task('lint-less', function() {
//    return gulp.src('src/styles/**/*.less')
//        .pipe($.plumber({errorHandler: onError}))
//        .pipe(verbosePrintFiles('lint-js'))
//        .pipe($.recess({includePath: _(mainCssFiles).pluck('searchPaths').flatten().uniq().value()}))
//        .pipe($.recess.reporter());
//});

gulp.task('less', false, function() {
    var destDir  = 'dist/css';
    var destFile = 'main.css';

    return gulp
        // Use all less files as newer source
        .src(['src/**/*.less'].concat(_.pluck(mainCssFiles, 'main')), {base: '.'})
        .pipe($.newer(destDir + '/' + destFile))
        // Only process the main less file(s), with their individual search paths
        .pipe($.filter(_.pluck(mainCssFiles, 'main')))
        .pipe($.foreach(function(stream, file) {
            var relFilePath = file.path.replace(file.cwd + '/', '');
            return stream
                .pipe(verbosePrintFiles('less'))
                .pipe($.less({
                    paths: _.find(mainCssFiles, 'main', relFilePath).searchPaths || []
                }));
        }))
        .pipe($.concat(destFile))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe($.if(isProduction, $.minifyCss()))
        .pipe(gulp.dest(destDir))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('fonts', false, function() {
    var destDir = 'dist/fonts';
    return gulp
        .src(['bower_components/font-awesome/fonts/**'])
        .pipe($.newer(destDir))
        .pipe(verbosePrintFiles('fonts'))
        .pipe(gulp.dest(destDir));
});

gulp.task('www-root', false, function() {
    var destDir = 'dist';
    return gulp
        .src(['www-root/**'])
        .pipe($.newer(destDir))
        .pipe(verbosePrintFiles('www-root'))
        .pipe(gulp.dest(destDir));
});

/************************************************************************
 * HTML file tasks
 */

gulp.task('index-html', false, function() {
    var destDir = 'dist';
    return gulp.src(['src/index.html'])
        .pipe($.newer(destDir))
        .pipe(verbosePrintFiles('index-html'))
        .pipe($.if(isProduction, $.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe(gulp.dest(destDir))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('partials', false, function() {
    var destDir  = 'dist/js';
    var destFile = 'partials.js';
    return gulp.src('src/**/*.partial.html')
        .pipe($.newer(destDir + '/' + destFile))
        .pipe(verbosePrintFiles('partials'))
        .pipe($.if(isProduction, $.htmlmin({
            collapseWhitespace: true,
            removeComments: true
        })))
        .pipe($.ngHtml2js({
            moduleName: 'app.templates',
            prefix: ''
        }))
        .pipe($.concat(destFile))
        .pipe($.if(isProduction, $.uglify()))
        .pipe(gulp.dest(destDir))
        .pipe(browserSync.reload({stream:true}));
});

/************************************************************************
 * Build / Watch / Reload tasks
 */

gulp.task('lint', 'Lints all TypeScript files', function(cb) {
    runSequence('lint-js', /*'lint-less',*/ cb);
});

gulp.task('build', 'Builds the source files into a distributable package', function(cb) {
    runSequence('clean-build', 'build-iterate', cb);
}, {
    options: {
        'prod':    'Enable production minification, sourcemaps, etc.',
        'verbose': 'Display debugging information'
    }
});

gulp.task('build-iterate', false, function(cb) {
    runSequence('lint', ['vendor-js', 'app-js', 'index-html', 'partials', 'fonts', 'www-root', 'less'], cb);
});

gulp.task('watch', 'Watch for file changes and re-run build and lint tasks', ['build-watch'], function() {
    isWatching = true;

    var port = 8000;
    $.util.log('Starting browser-sync on port ' + port);

    browserSync({
        // Start server...
        server: {
            baseDir: './dist'
        },
        // ...or proxy to separate static server
        //proxy: 'localhost:' + port,
        //port: 3000,
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'tsSPA',
        notify: true,
        minify: false,
        reloadDelay: 1000,
        browser: ['google chrome'],
        open: false
    });

    gulp.watch('src/**/*.ts',           ['lint-js']);
    gulp.watch('src/index.html',        ['index-html']);
    gulp.watch('src/**/*.partial.html', ['partials']);
    gulp.watch('src/styles/**/*.less',  ['less']);

    return bundleTs();
}, {
    options: {
        'prod': 'Enable production minification, sourcemaps, etc.'
    }
});

// Don't run app-js during watch, handled by watchify
gulp.task('build-watch', false, ['clean-build'], function(cb) {
    runSequence('lint', ['vendor-js', 'index-html', 'partials', 'fonts', 'www-root', 'less'], cb);
});

/************************************************************************
 * Functions/Utilities
 */

// Desktop notifications of errors
function onError(err) {
    // jshint validthis: true
    notifier.notify({
        title: err.plugin + ' Error',
        message: err.message
    });
    $.util.log(err.toString());
    $.util.beep();
    if (isWatching) {
        this.emit('end');
    } else {
        process.exit(1);
    }
}

function verbosePrintFiles(taskName) {
    return $.if(isVerbose, $.print(function(filepath) {
        return taskName + ': ' + filepath;
    }))
}
