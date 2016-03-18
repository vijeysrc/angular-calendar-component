"use strict";

let gulp = require("gulp"),
    ngTemplateCache = require("gulp-angular-templatecache"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    minifyHtml = require("gulp-minify-html"),
    del = require("del"),
    eventStream = require("event-stream"),
    bower = require('gulp-bower');

gulp.task("buildJs", ["cleanJs", "bower"], function () {
    var jsStream = gulp.src(["bower_components/calendar-service/calendar.service.js", "src/**/*.js"]),
        tcStream = gulp.src("src/**/*.html")
                    .pipe(minifyHtml())
                    .pipe(ngTemplateCache({
                        module: "vj.calendar",
                        standalone: false
                    }));

    return eventStream.merge(jsStream, tcStream)
        .pipe(concat("calendar.component.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});

gulp.task("cleanJs", function (done) {
    del(["dist/**/*.js"]).then(function () {
        done();
    });
});

gulp.task('bower', function() {
    return bower();
});

gulp.task("build", ["buildJs"]);