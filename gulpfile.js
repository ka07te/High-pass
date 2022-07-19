const { src, dest, series, watch, registry } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const image = require("gulp-image");
const webp = require('gulp-webp');
const fileInclude = require('gulp-file-include');
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dist"]);
};

const fonts = () => {
  return src("src/font/**").pipe(dest("dist/font"));
};
const resources = () => {
  return src("src/resources/**")
  .pipe(dest("dist/js"))
};
const phpmailer = () => {
  return src("src/phpmailer/**")
  .pipe(dest("dist/phpmailer"))
};
const svgSprites = () => {
  return src("src/img/svg/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/images"));
};



const htmlInclude = () => {
  return src(['src/**/*.html'])
    .pipe(fileInclude())
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
}


const imagesDev = () => {
  return src(["src/img/**/*.jpg", "src/img/**/*.png", "src/img/**/*.jpeg", "src/img/**/*.svg"])
    .pipe(image())
    .pipe(webp())
    .pipe(dest("dist/images"));
};



const imagesPng= () => {
  return src(["src/img/**/*.png"])
    .pipe(image())
    .pipe(dest("dist/images"));
};


const stylesDev = () => {
  return (
    src("src/style/**/*.scss")
      .pipe(sourcemaps.init())
      // .pipe(concat("main.css"))
      .pipe(sass())
      .pipe(sourcemaps.write("./"))
      .pipe(dest("dist/style"))
      .pipe(browserSync.stream())
  );
};

const htmlMinifyDev = () => {
  return src("src/**/*.html").pipe(dest("dist")).pipe(browserSync.stream());
};
const phpDev = () => {
  return src("src/**/*.php").pipe(dest("dist"));
};
const scriptsDev = () => {
  return src(["src/js/*.js"])
    .pipe(sourcemaps.init())
    .pipe(concat("app.js"))
    .pipe(sourcemaps.write())
    .pipe(dest("dist/js"))
    .pipe(browserSync.stream());
};

const watchFilesDev = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};
watch("src/**/*.html", htmlMinifyDev);
watch("src/style/**/*.scss", stylesDev);
watch("src/images/svg/**/*.svg", svgSprites);
watch("src/js/**/*.js", scriptsDev);
watch("src/fonts/**", fonts);
watch("src/**/*.html", htmlInclude);

exports.clean = clean;
exports.svgSprites = svgSprites;
exports.html = htmlInclude;

exports.dev = series(
  clean,
  fonts,
  resources,
  htmlMinifyDev,
  scriptsDev,
  stylesDev,
  imagesDev,
  svgSprites,
  htmlInclude,
  phpmailer,
  phpDev,
  imagesPng,
  watchFilesDev
);

const imagesBuild = () => {
  return src(["src/img/**/*.jpg", "src/img/**/*.jpeg"])
    .pipe(image())
    .pipe(webp())
    .pipe(dest("dist/images"));
};

const stylesBuild = () => {
  return src("src/style/**/*.scss")
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
        grid: true,
        overrideBrowserslist: ["last 5 versions"]
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest("dist/style"));
};
const htmlMinifyBuild = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("dist"));
};
const scriptsBuild = () => {
  return src(["src/js/*.js"])
    .pipe(concat("app.js"))
    .pipe(
      uglify({
        toplevel: true,
      }).on("error", notify.onError())
    )
    .pipe(dest("dist/js"));
};
exports.build = series(
  clean,
  fonts,
  resources,
  htmlMinifyBuild,
  scriptsBuild,
  stylesBuild,
  imagesBuild,
  htmlInclude,
  phpmailer,
  phpDev,
  imagesPng,
  svgSprites
);
