'use strict';

const watchify = require('watchify');
const browserify = require('browserify');
const tsify = require('tsify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const log = require('gulplog');
const assign = require('lodash.assign');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const mocha = require('gulp-mocha');
const spsave = require('gulp-spsave');
const spConfig = require('./src/ts/config/sharepointConfig');
const _ = require('lodash');
const htmlreplace = require('gulp-html-replace');

// parse command line arguments
let isTest = false;
const arg = (argList => {
    let arg = {},
        a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {
        thisOpt = argList[a].trim();
        if (thisOpt === "test") {
            isTest = true;
            break;
        }
        opt = thisOpt.replace(/^\-+/, '');
        if (opt === thisOpt) {
            // argument value
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        } else {
            // argument name
            curOpt = opt;
            arg[curOpt] = true;
        }
    }
    return arg;
})(process.argv);

if (!arg.source && !arg.s && !isTest) {
    console.log("usage: gulp [task] --source <sourcefile>")
    process.exit();
}

// Set the browser that you want to support
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// gulp configuration
const config = {
    ts: {
        src: './src/ts/main.ts', // Entry point
        outputDir: './dist/js', // Directory to save bundle to
        mapDir: './maps/', // Subdirectory to save maps to
        outputFile: 'bundle.js' // Name to use for bundle
    },
    css: {
        src: './src/css/style.css',
        outputDir: './dist/css',
    },
    html: {
        src: './src/*.html',
        outputDir: './dist',
    },
    tsify: {
        // TypeScript configuration location
        project: "config/tsconfig.json",
        typescript: require("typescript")
    }
}

let sharepointProject = null
for (let i = 0; i < spConfig.projects.length; i++) {
    if (spConfig.projects[i].src.includes(arg.source)) {
        sharepointProject = spConfig.projects[i];
        break;
    }
}

if (!isTest && sharepointProject === null) {
    throw new Error(`source '${arg.source}' does not match any config`)
}

// Benutzerdefinierte browserify Optionen.
let customOpts = {
    entries: (!isTest) ? [sharepointProject.src] : null,
    debug: true
};
let opts = assign({}, watchify.args, customOpts);
let bundler = watchify(browserify(opts));

bundler.plugin(tsify, config.tsify);

// Gulp task to minify all files
gulp.task('scripts', bundleScripts);
gulp.task('styles', bundleStyles);
gulp.task('html', bundleHtml);
gulp.task('test', tests);
gulp.task('spsave', saveToSharePoint);
gulp.task('clean', () => del(['dist'])); // Clean output directory
gulp.task('deploy', gulp.series('test', 'clean', gulp.parallel('scripts', 'html', 'styles'), 'spsave'));
gulp.task('deployDev', gulp.series('clean', gulp.parallel('scripts', 'html', 'styles'), 'spsave'));
gulp.task('default', gulp.series('clean', gulp.parallel('scripts', 'html', 'styles')));

bundler.on('update', gulp.parallel('scripts', 'html', 'styles')); // on any dep update, runs the bundler
bundler.on('log', log.info); // output build logs to terminal

// Gulp task to translate TypeScript to JavaScript, minify all JS files
// and create a sourcemap
function bundleScripts() {
    return browserify(customOpts)
        .plugin(tsify, config.tsify)
        .bundle()
        .pipe(source(config.ts.outputFile))
        // sourcemap for development
        .pipe(buffer())
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        // Minify the file
        .pipe(uglify())
        .pipe(sourcemaps.write(config.ts.mapDir))
        .pipe(gulp.dest(config.ts.outputDir));
}

// Gulp task to minify CSS files
function bundleStyles() {
    return gulp.src(config.css.src)
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS
        }))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest(config.css.outputDir))
}

function bundleHtml() {
    return gulp.src([config.html.src])
        .pipe(htmlreplace({
            'css': sharepointProject.subSite + sharepointProject.folder + '/css/style.css',
            'js': {
                src: sharepointProject.subSite + sharepointProject.folder + '/js/bundle.js',
                tpl: '<script type="text/javascript" src="%s"></script>'
            }
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(config.html.outputDir));
}

async function tests() {
    testScripts();
    await asyncTestScripts();
}

// Gulp task to run mocha tests
function testScripts() {
    return gulp.src('test/*Test.ts')
        .pipe(mocha({
            reporter: 'nyan',
            require: ['ts-node/register']
        }));
}

// Gulp task to run async test launcher for async mocha tests.
function asyncTestScripts() {
    return gulp.src('test/asyncTestLauncher.ts')
        .pipe(mocha({
            require: ['ts-node/register']
        }));
}

// Uploads dist/ dir to SharePoint
function saveToSharePoint() {
    if (spConfig.username == "" && spConfig.password == "") {
        console.log("SharePoint username and password are missing inside 'src/ts/config/spConfig.ts'")
        return;
    }

    let sharepointProject = null
    for (let i = 0; i < spConfig.projects.length; i++) {
        if (spConfig.projects[i].src.includes(arg.source | arg.s)) {
            sharepointProject = spConfig[i];
            break;
        }
    }

    if (sharepointProject === null) {
        console.error(`source '${arg.source | arg.s}' does not match any config`)
    }

    return gulp.src(["dist/**/*"], {
            base: "dist"
        })
        .pipe(spsave({
            siteUrl: `${spConfig.site}${sharepointProject.subSite}`,
            folder: sharepointProject.folder,
            flatten: false
        }, {
            username: spConfig.username,
            password: spConfig.password
        }));
}