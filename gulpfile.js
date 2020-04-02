var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var autoprefixer = require('autoprefixer');
var cssmin = require('gulp-clean-css');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var csscomb = require('gulp-csscomb');
var sass = require('gulp-sass');
var CompassImporter = require('compass-importer');
var SpriteMagicImporter = require('sprite-magic-importer');
var cssDeclarationSorter = require('css-declaration-sorter');
var sassGlob = require('gulp-sass-glob');
var postcss = require('gulp-postcss');
var assets  = require('postcss-assets');
var header = require('gulp-header');
var replace = require('gulp-replace');
var sourcemaps = require('gulp-sourcemaps');
var mode = require('gulp-mode')({
  modes: ['prd', 'dev'],
  default: 'dev', // 本番のときはprdに変えて実行
  verbose: true
});
var cssnano = require("cssnano");


gulp.task('imagemin', function(){
	gulp.src(['asset/**/*'])
	.pipe(imagemin())
	.pipe(gulp.dest('images/'));
});


gulp.task('sass', function(){

  const postcssplugin = [
    autoprefixer({ //ベンダープレフィックス付与
      grid: true
    }),
    assets({ // 画像の取扱い
      loadPaths: ['images/'], // ['images', '.icons', './banners']配列 background: resolve('画像名');
      relative: true,
      // baseUrl: 'http://www.codecode.xyz/wp-content/thmes/',
      cachebuster: true,
      basePath: './'
    }),
    cssDeclarationSorter({ // プロパティをソート
      order: 'smacss', // alphobetically, smacss, concentric-css
    })
  ];

  const postcssplugin_nano = [
    cssnano({
      autoprefixer: false
    })
  ];

  return gulp.src(['sass/*.scss'])
  .pipe(plumber({ //エラー発生時にデスクトップ通知
    errorHandler: notify.onError('Error: <%= error.message %>')
  }))
  .pipe(mode.dev(sourcemaps.init())) //（開発時のみ）ソースマップ初期化
  .pipe(sassGlob())
  .pipe(sass({
    importer: [
      SpriteMagicImporter({
        sass_dir: 'sass',
        images_dir: 'images', // 置いてある場所
        generated_images_dir: 'images', // 出力先
        http_stylesheets_path: 'css',
        http_generated_images_path: 'images', // geneated_images_dirまでの絶対パスがcssに出る
        debug: true,
        use_cache : false

        // spritesmith options
        // spritesmith: {
        //     algorithm: `diagonal`,
        //     padding: 2
        // },

        // imagemin-pngquant options
        // pngquant: {
        //     quality: 75,
        //     speed: 10
        // }
      }),
      CompassImporter
    ],
    outputStyle: 'expanded',
    indentType: 'tab',
    indentWidth: 1,
    errLogToConsole: true
  }))
  .pipe(postcss(postcssplugin)) // post-cssプラグイン付き
  .pipe(mode.prd(replace('\n\n', '\n'))) // （本番のみ）改行*2を改行*1へ
  .pipe(mode.prd(replace('@media screen and', '\n@media screen and'))) // （本番のみ）@mediaの前に改行
  .pipe(mode.prd(replace('/* -', '\n/* -'))) // （本番のみ）コメント行の前に改行
  .pipe(mode.dev(sourcemaps.write('./'))) //（開発時のみ）ソースマップ書き出し
  .pipe(mode.prd(postcss(postcssplugin_nano)))
  .pipe(mode.prd(rename({
      suffix: '.min'
  })))
  .pipe(gulp.dest('css/'));
});


gulp.task('compass', function(){
	return gulp.src('sass/*.scss')
	.pipe(plumber())
	.pipe(compass({
		config_file: 'config.rb',
    comments: false,
    css: 'css/',
    sass: 'sass/'
	}))
	.pipe(gulp.dest('css'));
});


gulp.task('uglify', function(){
	return gulp.src(['js/*.js', '!js/*.min.js'])
	.pipe(uglify())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('js/'));
});


gulp.task('concat', function () {
	gulp.src(['js/jquery.easing.1.3.js', 'js/jquery-migrate-1.2.1.min.js', 'js/slick.min.js', 'js/slick_use.js', 'js/side_menu.min.js', 'js/parallax.min.js', 'js/cufon-yui.min.js', 'js/tab_index.min.js'])
		.pipe(concat('header.js'))
		.pipe(gulp.dest('js/'));
});


gulp.task('cssmin', function(){
	return gulp.src(['css/*.css', '!css/*.min.css'])
		.pipe(prefix())
		.pipe(csscomb())
		.pipe(cssmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('css'));
});


gulp.task('watch', function () {
  // gulp.watch('sass/*.scss', gulp.series('compass', 'cssmin'));
  gulp.watch('sass/*.scss', gulp.series('sass'));
	gulp.watch(['js/*.js', '!js/*.min.js'], gulp.parallel('uglify'));
});

