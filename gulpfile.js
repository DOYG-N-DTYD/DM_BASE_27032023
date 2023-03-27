//  npm init
//  npm i gulp --save-dev

//Отдельная переменная для выбора языка SASS or LESS
let preprocessor = 'sass'; // 'SASS' 'LESS'

const {src ,dest, parallel, series, watch} = require('gulp'); //созданы переменные константы от гулпа 
//  установка LIVE-SERVER:  npm i browser-sync --save-dev
//  установка JQUERY        npm i --save-dev jquery
//  установка CONCAT        npm i --save-dev gulp-concat
//  установка UGLIFY        npm i --save-dev gulp-uglify-es
//  установка SASS          npm i --save-dev gulp-sass
//  установка LESS          npm i --save-dev gulp-less
//  установка AUTOPREFIXER  npm i --save-dev gulp-autoprefixer
//  установка CLEANcss      npm i --save-dev gulp-clean-css
//  установка IMAGEMIN      npm i --save-dev gulp-imagemin
//  установка NEWER         npm i --save-dev gulp-newer
//  установка nodejs модуль npm i --save-dev del

const browserSync   = require('browser-sync').create();     //подключение browser-sync
const concat        = require('gulp-concat');               //подключение concat
const uglify        = require('gulp-uglify-es').default;    //подключение uglify
const sass          = require('gulp-sass');                 //подключение SASS
const less          = require('gulp-less');                 //подключение LESS
const autoprefixer  = require('gulp-autoprefixer');         //подключение autoprefixer
const cleancss      = require('gulp-clean-css');            //подключение clean-css
const imagemin      = require('gulp-imagemin');             //подключение imagemin
const newer         = require('gulp-newer');                //подключение newer
const del           = require('del');                       // nodejs del для удаления

    function browsersync(){ // создание функции browsersync
        browserSync.init({  // инициализация browsersync
            //server: { baseDir: 'app/'}, // папка в главное директории // Если есть PHP то
            proxy:"http://localhost:3000/AntonPawlowPoprawki/app/",
            notify: false,              // отключение уведомлений
            online: true,               // режим офлайн: false
        })
    } 
//Для использования PHPH файлов нужен прокси/ локальный домен
//синтаксис Browsersync ??
//Функция слежения за PHP? нужна ?


// Для работы с функциями, нужно их экспортировать в Task

    function scripts(){
        return src([
            'node_modules/jquery/dist/jquery.min.js',
            'app/js/app.js', 
            'app/js/click-carousel.js',
            //'app/js/click-carousel.min.js'        

        //конкатенирование файлов через команду PIPE
        ])
        .pipe(concat('app.min.js')) // файл куда будем сгружать сконкатенированое 
        //Создание функции в промежутке которая бьудет сжимать скрипты 
        .pipe(uglify())             // можно без параметров
        .pipe(dest('app/js'))       // папка куда выгрузится файл
        .pipe(browserSync.stream()) // слежение и перезагрузка страницы
    }




//Функциядляобработки SASS
    function styles(){
        return src([
            'app/'+preprocessor+'/main.'+preprocessor+'',
            'app/'+preprocessor+'/menu.'+preprocessor+'',
            'app/'+preprocessor+'/config.'+preprocessor+'',
            'app/'+preprocessor+'/gallery.'+preprocessor+'',
            'app/'+preprocessor+'/feedBack.'+preprocessor+'',
            'app/'+preprocessor+'/page12345.'+preprocessor+'',
            'app/'+preprocessor+'/page1.'+preprocessor+'',
            'app/'+preprocessor+'/page2.'+preprocessor+'',
            'app/'+preprocessor+'/page3.'+preprocessor+'',
            'app/'+preprocessor+'/page4.'+preprocessor+'',
            'app/'+preprocessor+'/page5.'+preprocessor+'',
            'app/'+preprocessor+'/page_about.'+preprocessor+'',
            'app/'+preprocessor+'/page_contact.'+preprocessor+'',
            'app/'+preprocessor+'/page_orderBuy.'+preprocessor+'',
            'app/'+preprocessor+'/page_products.'+preprocessor+'',
        ])
        .pipe(eval(preprocessor)())  // использорвание препроцессора (eval берёт название функции )
        .pipe(concat('app.min.css')) // файл куда будем сгружать сконкатенированое 
        .pipe(autoprefixer({
            overrideBrowserslist:['last 10 versions'],grid: true
        }))
        .pipe(cleancss(({ level :{1:{specialComments:0}}, format: 'beautify'})))  // параметры : 1) уровень
        .pipe(dest('app/css/'))      // папка куда выплюнет результат
        .pipe(browserSync.stream())  // слежение за стилями и перезагрузка
    } 

// Функция работы с изображениями
    function imagesFlags(){
        return src([
            'app/images/src/Products/**/*'
        ])
        .pipe(newer('app/images/dest/Products')) //Сравниваем с конечной папкой, где уже есть изобраджения минимизированые
        .pipe(imagemin())
        .pipe(dest('app/images/dest/Products'))   
    }
//Моя функция изображения иконки
    function imagesIco(){
        return src([
            'app/images/src/ico/**/*'
        ])
        .pipe(newer('app/images/dest/ico'))
        .pipe(imagemin())
        .pipe(dest('app/images/dest/ico'))
    }

//Функция CleanIMG чистит папку dest
    function cleanimg(){
        return del('app/images/dest/**/*', {force: true}) // удалить форсировано 
    }

//Функция Cleandist чистит папку dist
    function cleandist(){
        return del('dist/**/*', {force: true}) // удалить форсировано 
    }


// Функция сборки проекта    
    function buildcopy(){
        return src([
            'app/css/**/*.min.css',
            'app/js/**/*.min.js',
            'app/images/dest/**/*',
            'app/**/*.html',
            'app/**/*.php'                              //PHP build
        ],{base:'app'}) // base app структура папок
        .pipe(dest('dist'));
    }

// Функция обновления страницы , watcher
    function startwatch(){
        watch(['app/**/*.js','!app/**/*.min.js'], scripts);     // следить нужно за всеми JS файлами (кроме !)
                                                                // Trigger scripts  
        watch(['app/**/'+preprocessor+'/**/*'], styles);        // следить нужно за всеми PREPROCESSOR файлами
                                                                // Trigger styles    
        watch('app/**/*.html').on('change',browserSync.reload); //следить за HTML
        watch('app/**/*.php').on('change',browserSync.reload);  //следить за PHP  ??  
        watch('app/images/src/Products/**/*', imagesFlags);     //следить за картинками 
        watch('app/images/src/ico/**/*', imagesIco);            //следить за картинками ICO
    }

exports.browsersync = browsersync;  // создание таска browsersync_task <- function
exports.scripts     = scripts;      // создание таска scripts
exports.styles      = styles;       // создание таска styles
exports.imagesFlags = imagesFlags;  // создание таска images
exports.imagesIco   = imagesIco;    // создание таска images
exports.cleanimg    = cleanimg;     // создание таска del 
exports.build       = series(cleandist, styles, scripts, imagesFlags,imagesIco, buildcopy);
//Дефолтный таск
exports.default = parallel(styles, scripts, browsersync, startwatch);