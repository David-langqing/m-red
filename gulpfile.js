

const gulp = require('gulp')
const server = require('gulp-webserver')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')
const watch = require('gulp-watch')
const proxy = require('http-proxy-middleware')


// 编译sass
gulp.task('packscss', () => {
    return gulp.src('./src/styles/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dev/styles'))
})

// 启动一个web-server,应用的插件是gulp-webserver
gulp.task('server', () => {
    return gulp.src('./dev')
        .pipe(server({
            host: 'localhost',
            port: 8081,
            livereload: true,
            middleware: [
                // proxy('/api', {
                //     target: 'https://m.lagou.com',
                //     changeOrigin: true
                // }),
                // proxy('/lagou', {
                //     target: 'https://m.lagou.com',
                //     changeOrigin: true,
                //     pathRewrite: {
                //         '^/lagou': ''
                //     }
                // })
                proxy('/api', {
                    target: 'http://localhost:3000',
                    changeOrigin: true
                }),
                proxy('/lagou', {
                    target: 'http://m.lagou.com/',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/lagou': ''
                    }
                })
            ]
        }))
})

// copy index.html
gulp.task('copyhtml', () => {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./dev/'))
})

// copy libs
gulp.task('copylibs', () => {
    return gulp.src('./src/libs/**/*')
        .pipe(gulp.dest('./dev/libs'))
})
// copy img
gulp.task('copyimg', () => {
    return gulp.src('./src/images/**/*')
        .pipe(gulp.dest('./dev/images'))
})
// copy mock
gulp.task('copymock', () => {
    return gulp.src('./src/mock/**/*')
        .pipe(gulp.dest('./dev/mock'))
})

// copy iconfonts
gulp.task('copyicon', () => {
    return gulp.src('./src/iconfonts/**/*')
        .pipe(gulp.dest('./dev/iconfonts'))
})

// 文件修改 watch
gulp.task('watch', () => {
    gulp.watch('./src/*.html', ['copyhtml'])
    // gulp-watch,实现文件的创建，修改，删除 watch
    // 缺点：某些操作系统不支持
    watch('./src/libs/**/*', () => {
        gulp.start(['copylibs'])
    })
    watch('./src/images/**/*', () => {
        gulp.start(['copyimg'])
    })
    // watch('./src/mock/**/*', () => {
    //   gulp.start(['copymock'])
    // })
    gulp.watch('./src/scripts/**/*', ['packjs'])
    gulp.watch('./src/styles/**/*', ['packscss'])
})
// CommonJS规范做JS模块化
gulp.task('packjs', () => {
    return gulp.src('./src/scripts/*.js')
        .pipe(webpack({
            mode: 'development',
            entry: {
                app: ['@babel/polyfill', './src/scripts/app.js']
            },
            output: {
                filename: 'app.js'
            },
            module: {
                rules: [
                    {
                        test: /\.html$/,
                        use: ['string-loader']
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(gulp.dest('./dev/scripts'))
})

// default task
gulp.task('default', ['packjs', 'copyimg', 'packscss', 'copyhtml', 'copymock', 'server', 'copylibs', 'copyicon', 'watch'], () => {
    console.log('all works!')
})  