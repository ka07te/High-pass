const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
  smoothLink.addEventListener("click", (e) => {
    e.preventDefault();
    const id = smoothLink.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

const searchIcon = document.querySelector(".header-search__icon");
const searchClose = document.querySelector(".header-search__close");
const searchInput = document.querySelector(".header-search__input");
const searchImg = document.querySelector(".header-search__icon-img");
const logo = document.querySelector(".header-menu-logo");
const label = document.querySelector(".header-search__label");
const header = document.querySelector(".header");
const headerBody = document.querySelector(".header-body");
if (searchIcon) {
  searchIcon.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.classList.add("active");
    searchClose.classList.add("active");
    searchImg.classList.add("active");
    logo.classList.add("active");
    label.classList.add("active");
    headerlist.classList.add("hidden");
    headerBody.classList.add("active");
  });
}
if (searchClose) {
  searchClose.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.classList.remove("active");
    searchClose.classList.remove("active");
    searchImg.classList.remove("active");
    logo.classList.remove("active");
    label.classList.remove("active");
    headerlist.classList.remove("hidden");
    headerBody.classList.remove("active");
  });
}

const menuBurger = document.querySelector(".menu-burger");
const burgerClose = document.querySelector(".menu-burger__close");
const burgerOpen = document.querySelector(".menu-burger__open");
const headerlist = document.querySelector(".header-list");

if (menuBurger) {
  menuBurger.addEventListener("click", (e) => {
    e.preventDefault();
    burgerOpen.classList.toggle("active");
    burgerClose.classList.toggle("active");
    headerlist.classList.toggle("active");
    header.classList.toggle("active");
  });
}

const tLine = new TimelineMax();
const tl = new TimelineMax();
const tlin = new TimelineMax();
tLine.from(".animation-one", { duration: 0.7, x: -100, opacity: 0 });
tl.from(".animation-two", { duration: 0.7, x: 100, opacity: 0 });
tlin.from(".animation-three", { duration: 0.7, y: 100, opacity: 0 });

const aboutText = document.querySelector(".about-us__info");
if (aboutText) {
  aboutText.textContent =
    "В рамках спецификации современных стандартов, интерактивные прототипы, инициированные исключительно синтетически, ограничены исключительно образом мышления. Предварительные выводы неутешительны: высокотехнологичная концепция общественного уклада требует от нас анализа соответствующих условий активизации! Следует отметить, что семантический разбор внешних противодействий фиксирует необходимость распределения внутренних резервов и ресурсов. Безусловно, граница обучения кадров предоставляет широкие возможности для первоочередных требований. Повседневная практика показывает, что глубокий уровень погружения предполагает независимые способы реализации новых принципов формирования материально-технической и кадровой базы. Приятно, граждане, наблюдать, как явные признаки институционализации являются только методом политического участия и нарушающими общечеловеческие нормы этики.";

  aboutText.addEventListener("click", () => {
    aboutText.classList.toggle("active");
  });
}

// value="ТЕКСТ" onfocus="if (value == 'ТЕКСТ') {value = ''}" onblur="if (value == '') {value = 'ТЕКСТ'}" 

const thankText = document.querySelector(".thank__text");
const formInput = document.querySelectorAll(".js-input");
const inputAbout = document.querySelector(".subscribe__input");
if (formInput) {
  formInput.forEach((input) => {
    if (thankText) {
      thankText.addEventListener("click", (e) => {
        e.preventDefault();
        input.textContent = " ";
      });
    }
  });
}
if (inputAbout) {
  inputAbout.addEventListener('focus',()=>{
    inputAbout.value = ' '
  })
  inputAbout.addEventListener('blur',()=>{
    inputAbout.value = 'E-mail '
  })
}
function onEntry(entry) {
  entry.forEach((change) => {
    if (change.isIntersecting) {
      change.target.classList.add("element-show");
    } else {
      change.target.classList.remove("element-show");
    }
  });
}

let options = { threshold: [0.5] };
let observer = new IntersectionObserver(onEntry, options);
let elements = document.querySelectorAll(".element-animation");
for (let elm of elements) {
  observer.observe(elm);
}

class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {},
    };
    this.options = Object.assign(defaultOptions, options);
    const modalSelects = document.querySelectorAll(".modal");
    modalSelects.forEach((modal) => {
      this.modal = modal;
    });

    this.speed = false;
    this.animation = false;
    this.isOpen = false;
    this.modalContainer = false;
    this.previousActiveElement = false;

    this.focusElements = [
      "a[href]",
      "input",
      "button",
      "select",
      "textarea",
      "[tabindex]",
    ];
    this.events();
  }

  events() {
    if (this.modal) {
      document.addEventListener(
        "click",
        function (e) {
          const clickedElement = e.target.closest("[data-path]");
          if (clickedElement) {
            let target = clickedElement.dataset.path;
            let animation = clickedElement.dataset.animation;
            let speed = clickedElement.dataset.speed;
            this.animation = animation ? animation : "fade";
            this.speed = speed ? parseInt(speed) : 300;
            this.modalContainer = document.querySelector(
              `[data-target="${target}"]`
            );
            this.open();
            return;
          }

          if (e.target.closest(".modal-close")) {
            this.close();
            return;
          }
        }.bind(this)
      );

      window.addEventListener(
        "keydown",
        function (e) {
          if (e.keyCode == 27) {
            if (this.isOpen) {
              this.close();
            }
          }

          if (e.keyCode == 9 && this.isOpen) {
            this.focusCatch(e);
            return;
          }
        }.bind(this)
      );

      this.modal.addEventListener(
        "click",
        function (e) {
          if (
            !e.target.classList.contains("modal-card") &&
            !e.target.closest(".modal-card") &&
            this.isOpen
          ) {
            this.close();
          }
        }.bind(this)
      );
    }
  }

  open() {
    this.previousActiveElement = document.activeElement;

    this.modal.style.setProperty("--transition-time", `${this.speed / 1000}s`);
    this.modal.classList.add("is-open");
    this.disableScroll();

    this.modalContainer.classList.add("modal-open");
    this.modalContainer.classList.add(this.animation);

    setTimeout(() => {
      this.options.isOpen(this);
      this.modalContainer.classList.add("animate-open");
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }

  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove("animate-open");
      this.modalContainer.classList.remove(this.animation);
      this.modal.classList.remove("is-open");
      this.modalContainer.classList.remove("modal-open");
      this.enableScroll();
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
    }
  }

  focusCatch(e) {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    const focusArray = Array.prototype.slice.call(focusable);
    const focusedIndex = focusArray.indexOf(document.activeElement);

    if (e.shiftKey && focusedIndex === 0) {
      focusArray[focusArray.length - 1].focus();
      e.preventDefault();
    }

    if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
      focusArray[0].focus();
      e.preventDefault();
    }
  }

  focusTrap() {
    const focusable = this.modalContainer.querySelectorAll(this.focusElements);
    if (this.isOpen) {
      focusable[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }

  disableScroll() {
    let pagePosition = window.scrollY;
    document.body.classList.add("disable-scroll");
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + "px";
  }

  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    document.body.style.top = "auto";
    document.body.classList.remove("disable-scroll");
    window.scroll({ top: pagePosition, left: 0 });
    document.body.removeAttribute("data-position");
  }
}

const modal = new Modal();

const serviceSwiper = document.querySelector(".service-swiper");
if (serviceSwiper) {
  const swiper = new Swiper('.service-swiper', {
    spaceBetween: 50,
    slidesPerView: 1,
    observer: true,
    observeParents: true,
    slideClass: "service-slide",
    scrollbar: {
      el: ".swiper-scrollbar",
      draggable: true,
    },
    pagination: {
      el: ".service-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        if (index == 0) {
          index = "Основной перечень";
        }
        if (index == 1) {
          index = "Услуги по ретуши";
        }
        return '<span class="' + className + '">' + index + "</span>";
      },
    },
  });
}

const map = document.getElementById("map");

if (map) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map("map", {
        center: [55.769383, 37.638521],
        zoom: 15,
        controls: [],
      }),
      myPlacemark = new ymaps.Placemark(
        [55.769383, 37.638521],
        {},
        {
          iconLayout: "default#imageWithContent",
          iconImageHref: "images/map.png",
          iconImageSize: [12, 12],
        }
      );

    var zoomControl = new ymaps.control.ZoomControl({
      options: {
        position: { right: 0, top: 100 },
        size: "small",
      },
    });
    var geolocationControl = new ymaps.control.GeolocationControl({
      options: {
        position: { right: 0, top: 170 },
      },
    });
    myMap.controls.add(zoomControl);
    myMap.controls.add(geolocationControl);
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable("scrollZoom");
  });


  const mapClose = document.querySelector(".map-info__close");
  const mapInfo = document.querySelector(".map-info");
  mapClose.addEventListener("click", (e) => {
    e.preventDefault();
    mapInfo.classList.add("active");
    
    setTimeout(() => mapInfo.classList.remove("active"), 8000);
  });

}
const validate = document.querySelector(".js-validate");
if (validate) {
  new JustValidate(".js-validate", {
    colorWrong: "#FF3030",
    rules: {
      mail: {
        required: true,
        email: true,
      },
    },
  });
}
const valid = document.querySelector(".js-valid");
if (valid) {
  new JustValidate(".js-valid", {
    colorWrong: "#FF3030",
    rules: {
      name: {
        required: true,
        name: true,
        minLength: 2,
        maxLength: 30,
      },
      mail: {
        required: true,
        email: true,
      },
    },
  });
}

const backTopBtn = document.querySelector('.back-top');
if(backTopBtn){
function toggleBtn() {
  let scroll = window.pageYOffset;
  //  let coords = document.documentElement.clientHeight;
  if (scroll > 100) {
    backTopBtn.classList.add('active');
  }
  if (scroll < 100) {
    backTopBtn.classList.remove('active');
  }
}

function backTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
window.addEventListener('scroll', toggleBtn, true);
backTopBtn.addEventListener('click', backTop, true);
}