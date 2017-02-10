fs = require "fs"
path = require "path"

gulp = require "gulp"
sass = require "gulp-sass"
concat = require "gulp-concat"
rename = require "gulp-rename"
plumber = require "gulp-plumber"
runSequence = require "run-sequence"

skybondsBuildTools = require "@skybonds/ui-build-tools"

NODE_ENV = process.env.NODE_ENV or 'production'

R = path.join __dirname, ".."
destJsPath = "#{R}/vendors/"

buildConfig =
  watch: false
  externals:
    "react": "React"
    "react-dom": "ReactDom"
    "lodash": "_"

gulp.task "components:scripts", ->
  skybondsBuildTools
  .buildScripts R, buildConfig
  .pipe rename "skybonds.components.js"
  .pipe gulp.dest destJsPath

gulp.task "components:update",
  skybondsBuildTools.updateComponents R

gulp.task "build:components", ->
  runSequence(
    "components:update"
    "components:scripts"
  )

gulp.task "default", ["build"]

