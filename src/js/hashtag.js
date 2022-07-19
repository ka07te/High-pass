const projectHashtag = document.querySelectorAll(".js-hashtag");

function hashtagSet() {
  projectHashtag.forEach((hashtag) => {
    if (hashtag) {
      hashtag.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("hashtag", JSON.stringify(e.target.id));
        window.open("hashtag.html", "_self");
      });
    }
  });
}
hashtagSet();

function hashtagGet() {
  let hashtag = JSON.parse(localStorage.getItem("hashtag"));
  if (hashtag == undefined) {
    hashtag = [];
  }
  return hashtag;
}

function namePage(name) {
  if (name == "education") {
    name = "#мастеркласс";
  }
  if (name == "landscape") {
    name = "#пейзаж";
  }
  if (name == "portrait-man") {
    name = "#портрет";
  }
  if (name == "still-life") {
    name = "#предмет";
  }
  if (name == "fuji-camera") {
    name = "#fuji";
  }
  if (name == "retouching") {
    name = "#ретушь";
  }
  if (name == "portrait-woman") {
    name = "#портрет";
  }
  if (name == "project-oblivion") {
    name = "#проектзабвение";
  }
  return name;
}

function searchApi(name) {
  if (name == "education") {
    name = "education+business";
  }
  if (name == "landscape") {
    name = "nature";
  }
  if (name == "portrait-man") {
    name = "portrait+man";
  }
  if (name == "still-life") {
    name = "still-life";
  }
  if (name == "fuji-camera") {
    name = "fuji-camera";
  }
  if (name == "retouching") {
    name = "food";
  }
  if (name == "portrait-woman") {
    name = "portrait+woman";
  }
  if (name == "project-oblivion") {
    name = "ice+wall";
  }

  return name;
}

const hashtagSearch = document.querySelector(".hashtag__image-search");
const hashtagSearchBig = document.querySelector(".hashtag__image-search-big");
const hashtagBtnAdd = document.getElementById("hashtag-image-add");
const hashtagBtnBack = document.getElementById("hashtag-image-back");
const hashtagTitle = document.querySelector(".hashtag__title");
const hashtagBack = document.getElementById("hashtag-back");
const hashtagFooter = document.getElementById("hashtag-footer");
const hashtagHeader = document.getElementById("hashtag-header");
const hashtag = document.querySelector(".hashtag");

if (hashtagFooter) {
  let heightFooter = hashtagFooter.clientHeight;
  hashtag.style.paddingBottom = `${heightFooter}px`;
}

if (hashtagTitle) {
  hashtagTitle.textContent = namePage(hashtagGet());
}

if (hashtagBack) {
  hashtagBack.addEventListener("click", (e) => {
    window.open(`index.html#${hashtagGet()}`, "_parent");
  });
}

async function searchImage(name, page) {
  await fetch(
    `https://pixabay.com/api/?key=22932703-a9e94b6dd5b51c2b1974315af&q= ${name}+&pretty=true&per_page=5&page=${page}`
  )
    .then((res) => res.json())
    .then((data) => takePage(data))
    .catch((err) => console.log(err));
}
searchImage(searchApi(hashtagGet()), 1);

function takePage(data) {
  if (data.total !== 0) {
    for (const elem of data.hits) {
      const posterUrl = document.createElement("img");
      let str = elem.webformatURL;
      let url = str.replace("_640", "_340");
      posterUrl.setAttribute("src", url);
      posterUrl.setAttribute("id", elem.id);
      if (hashtagHeader) {
        let heightFooter = hashtagFooter.clientHeight;
        hashtagBack.style.bottom = `${heightFooter - 10}px`;
        hashtagBtnBack.style.bottom = `${heightFooter - 10}px`;
      }

      if (hashtagSearch) {
        hashtagSearch.append(posterUrl);
        posterUrl.addEventListener("click", (e) => {
          e.preventDefault();
          hashtagSearch.classList.add("active");
          hashtagSearchBig.textContent = " ";
          hashtagBtnAdd.classList.add("active");
          setTimeout(() => {
            hashtagBtnBack.classList.add("active");
          }, 1000);
          const imgLarge = document.createElement("img");
          imgLarge.setAttribute("src", elem.largeImageURL);
          hashtagSearchBig.setAttribute("id", elem.id);
          hashtagSearchBig.append(imgLarge);
        });
      }

      if (hashtagBtnBack) {
        hashtagBtnBack.addEventListener("click", (e) => {
          e.preventDefault();
          hashtagSearchBig.textContent = " ";
          hashtagSearch.classList.remove("active");
          hashtagBtnAdd.classList.remove("active");
          hashtagBtnBack.classList.remove("active");
          document.getElementById(hashtagSearchBig.id).scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      }
    }
  }
}
let page = 2;
if (hashtagBtnAdd) {
  hashtagBtnAdd.addEventListener("click", (e) => {
    e.preventDefault();
    searchImage(searchApi(hashtagGet()), page++);
    setTimeout(() => {
      hashtagBtnAdd.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 1000);
  });
}

function RandomPage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function workImage() {
  await fetch(
    `https://pixabay.com/api/?key=22932703-a9e94b6dd5b51c2b1974315af&orientation=horizontal&q= fashion&pretty=true&per_page=18&page=${RandomPage(
      1,
      27
    )}`
  )
    .then((res) => res.json())
    .then((data) => workPage(data))
    .catch((err) => console.log(err));
}
workImage();
const workContent = document.querySelector(".service-work__content");
const workBig = document.querySelector(".service-work__big-img");

function workPage(data) {
  if (data.total !== 0) {
    for (const elem of data.hits) {
      const workUrl = document.createElement("img");
      workUrl.setAttribute("src", elem.previewURL);
      const workDiv = document.createElement("div");
      workDiv.classList.add("service-work__wrapper");
      if (workContent) {
        workDiv.append(workUrl);
        workContent.append(workDiv);
        workDiv.addEventListener("click", (e) => {
          workBig.textContent = "";
          const big = document.createElement("img");
          e.preventDefault();
          big.setAttribute("src", elem.webformatURL);
          workBig.classList.toggle("active");
          workBig.append(big);
          workBig.addEventListener("click", (e) => {
            e.preventDefault();
            workBig.textContent = "";
            workBig.classList.remove("active");
          });
        });
      }
    }
  }
}

async function thankpage() {
  await fetch(
    `https://pixabay.com/api/?key=22932703-a9e94b6dd5b51c2b1974315af&orientation=horizontal&q=black+white+fashion&pretty=true&per_page=3&page=${RandomPage(
      1,
      50
    )}`
  )
    .then((res) => res.json())
    .then((data) => thanks(data))
    .catch((err) => console.log(err));
}
thankpage();
const thank = document.querySelector(".thank");

function thanks(data) {
  if (data.total !== 0) {
    let img = data.hits.slice(0, 1)[0];
    if (thank) thank.style.backgroundImage = `url(${img.largeImageURL})`;
  }
}
