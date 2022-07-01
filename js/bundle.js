/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calculator() {
  let sex, height, weight, age, ratio;
  const result = document.querySelector(".calculating__result span");

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector); //set static information

    if (localStorage.getItem("sex")) {
      sex = localStorage.getItem("sex");
    } else {
      sex = "female";
      localStorage.setItem("sex", "female");
    }

    if (localStorage.getItem("ratio")) {
      ratio = localStorage.getItem("ratio");
    } else {
      ratio = 1.375;
      localStorage.setItem("ratio", 1.375);
    } //set dynamic information


    if (localStorage.getItem("height")) {
      height = localStorage.getItem("height");
      document.querySelector("#height").value = localStorage.getItem("height");
    } else {
      height = "";
      localStorage.setItem("height", "");
    }

    if (localStorage.getItem("weight")) {
      weight = localStorage.getItem("weight");
      document.querySelector("#weight").value = localStorage.getItem("weight");
    } else {
      weight = "";
      localStorage.setItem("weight", "");
    }

    if (localStorage.getItem("age")) {
      age = localStorage.getItem("age");
      document.querySelector("#age").value = localStorage.getItem("age");
    } else {
      age = "";
      localStorage.setItem("age", "");
    } //assigment of active class for 'sex' & 'ratio'


    elements.forEach(elem => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }

      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio) {
      result.textContent = "____";
      return;
    }

    if (sex === "female") {
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - (4.3 - age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - (5.7 - age)) * ratio);
    }
  }

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
      elem.addEventListener("click", event => {
        if (event.target.getAttribute("data-ratio")) {
          ratio = +event.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +event.target.getAttribute("data-ratio"));
        } else {
          sex = event.target.getAttribute("id");
          localStorage.setItem("sex", event.target.getAttribute("id"));
        }

        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        event.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);
    input.addEventListener("input", () => {
      //hint for incorrect input
      if (input.value.match(/\D/g)) {
        input.style.boxShadow = "0px 0px 4px red";
      } else {
        input.style.boxShadow = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          localStorage.setItem("height", +input.value);
          break;

        case "weight":
          weight = +input.value;
          localStorage.setItem("weight", +input.value);
          break;

        case "age":
          age = +input.value;
          localStorage.setItem("age", +input.value);
          break;
      }

      calcTotal();
    });
  } //execution


  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
  calcTotal();
  getStaticInformation("#gender div", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;

      for (var _len = arguments.length, classes = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        classes[_key - 6] = arguments[_key];
      }

      this.classes = classes;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 27;
      this.changeToUAH();
    }

    changeToUAH() {
      //converting dollars to UAH
      this.price = this.price * this.transfer;
    }

    render() {
      //create HTML structure of the card
      const element = document.createElement("div");

      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
                ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`; //push card to the rest

      this.parent.append(element);
    }

  } //execution


  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)("http://localhost:3000/menu").then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Успешно! Скоро мы с вами свяжемся!",
    failure: "Что-то пошло не так.."
  };

  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault(); //creating message block

      let statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);
      const formData = new FormData(form); //converting FormData to JSON

      const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)("http://localhost:3000/requests", jsonData).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.remove("show");
    prevModalDialog.classList.add("hide");
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModalWinndow)(".modal", modalTimerId);
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModalWindow)(".modal");
    }, 4000);
  } //execution


  forms.forEach(item => {
    bindPostData(item);
  });
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModalWinndow": function() { return /* binding */ openModalWinndow; },
/* harmony export */   "closeModalWindow": function() { return /* binding */ closeModalWindow; }
/* harmony export */ });
function openModalWinndow(modalSelector, modalTimerId) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function closeModalWindow(modalSelector) {
  const modalWindow = document.querySelector(modalSelector);
  modalWindow.classList.add("hide");
  modalWindow.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  const contactBtns = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

  function showModalByScroll() {
    /* In this construction below,we subtract 1px from document.documentElement.scrollheight in 
    order to avoid bugs related to the technical characteristics of browsers and some monitors */
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModalWinndow(modalSelector, modalTimerId);
      removeEventListener("scroll", showModalByScroll);
    }
  } //execution


  contactBtns.forEach(item => {
    item.addEventListener("click", () => openModalWinndow(modalSelector, modalTimerId));
  });
  modalWindow.addEventListener("click", e => {
    if (e.target === modalWindow || e.target.getAttribute("data-close") === "") {
      closeModalWindow(modalSelector);
    }
  });
  document.addEventListener("keydown", e => {
    if (e.code === "Escape" && modalWindow.classList.contains("show")) {
      closeModalWindow(modalSelector);
    }
  });
  window.addEventListener("scroll", showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  let slideIndex = 1,
      offset = 0;
  const slider = document.querySelector(container),
        slides = document.querySelectorAll(slide),
        prevBtn = document.querySelector(prevArrow),
        nextBtn = document.querySelector(nextArrow),
        currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width;

  function showTotalSlides() {
    if (slides.length < 10) {
      totalSlides.textContent = `0${slides.length}`;
    } else {
      totalSlides.textContent = slides.length;
    }
  }

  function showCurrentSlide(index) {
    if (index > slides.length) {
      //transition from the last slide to the first
      slideIndex = 1;
    } else if (index < 1) {
      //transition from the first slide to the last
      slideIndex = slides.length;
    } //correct display


    if (index < 10) {
      currentSlide.textContent = `0${slideIndex}`;
    } else {
      currentSlide.textContent = slideIndex;
    }
  } //displaying active indicator


  function showActiveSliderIndicator() {
    dots.forEach((dot, i) => {
      dot.style.opacity = ".5";
    });
    dots[slideIndex - 1].style.opacity = "1";
  }

  function removeNonDigits(str) {
    return +str.replace(/\D/g, "");
  } //execution


  showTotalSlides();
  showCurrentSlide(slideIndex);
  slidesWrapper.style.overflow = "hidden"; //hiding everything outside slidesWrapper

  slidesField.style.width = 100 * slides.length + `%`; //setting the width based on the number of slides
  //set a clear witdth for each slides

  slides.forEach(slide => {
    slide.style.width = width;
  }); //slider buttons

  nextBtn.addEventListener("click", () => {
    slideIndex++;
    showCurrentSlide(slideIndex);
    showActiveSliderIndicator(); //check & changing indentation

    if (offset == removeNonDigits(width) * (slides.length - 1)) {
      //transition from the last slide to the first
      offset = 0;
    } else {
      //normal movement
      offset += removeNonDigits(width);
    } //sliderField motion


    slidesField.style.transform = `translateX(-${offset}px)`;
  });
  prevBtn.addEventListener("click", () => {
    slideIndex--;
    showCurrentSlide(slideIndex);
    showActiveSliderIndicator(); //check & changing indentation

    if (offset == 0) {
      //transition from the first slide to the last
      offset = removeNonDigits(width) * (slides.length - 1);
    } else {
      //normal movement
      offset -= removeNonDigits(width);
    } //sliderField motion


    slidesField.style.transform = `translateX(-${offset}px)`;
  }); //slider navigation

  slider.style.position = `relative`; //creating indicators

  const indicators = document.createElement("ol");
  indicators.classList.add("carousel-indicators");
  slider.append(indicators); //adding the required number of indicators

  for (let i = 0; i < slides.length; i++) {
    const indicator = document.createElement("li");
    indicator.classList.add("dot");
    indicator.setAttribute("data-number", i + 1);
    indicators.append(indicator);
  }

  const dots = document.querySelectorAll(".dot"); //setting the initial active slide

  dots[slideIndex - 1].style.opacity = "1"; //initial active indicator

  offset = removeNonDigits(width) * (slideIndex - 1); //indent adjustment

  slidesField.style.transform = `translateX(-${offset}px)`; //initial slide
  //interaction with indicators

  indicators.addEventListener("click", event => {
    if (event.target && event.target.classList.contains("dot")) {
      slideIndex = event.target.getAttribute(["data-number"]);
      showCurrentSlide(slideIndex); //indent adjustment

      offset = removeNonDigits(width) * (slideIndex - 1); //movement

      slidesField.style.transform = `translateX(-${offset}px)`;
      showActiveSliderIndicator();
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
  const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);
  tabsParent.addEventListener("click", event => {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add(activeClass);
  } //execution


  hideTabContent();
  showTabContent();
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  //add zero to number
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  } //calculates the remaining time


  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / 1000 / 60 % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector("#days"),
          hours = timer.querySelector("#hours"),
          minutes = timer.querySelector("#minutes"),
          seconds = timer.querySelector("#seconds"),
          timeInterval = setInterval(updateClock, 1000);
    updateClock(); //for instant update of the timer when the page is loaded

    function updateClock() {
      const t = getTimeRemaining(endtime);
      days.textContent = getZero(t.days);
      hours.textContent = getZero(t.hours);
      minutes.textContent = getZero(t.minutes);
      seconds.textContent = getZero(t.seconds);

      if (t.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";
        clearInterval(timeInterval);
      }
    }
  } //execution


  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": function() { return /* binding */ postData; },
/* harmony export */   "getResource": function() { return /* binding */ getResource; }
/* harmony export */ });
//sending data to the server
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: data
  });
  return await res.json();
}; //getting data from the server


const getResource = async url => {
  const res = await fetch(url);

  if (!res.ok) {
    throw Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");








window.addEventListener("DOMContentLoaded", () => {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModalWinndow)(".modal", modalTimerId), 50000);
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])("[data-modal]", ".modal", modalTimerId);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(".timer", "2022-12-21");
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__["default"])("form", modalTimerId);
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
    container: ".offer__slider",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    slide: ".offer__slide",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    field: ".offer__slider-inner"
  });
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map