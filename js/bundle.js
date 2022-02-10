/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    let sex, height, weight, age, ratio;

    const result = document.querySelector(".calculating__result span");

    function initLocalSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        //set static information
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
        }

        //set dynamic information
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
        }

        //assigment of active class for 'sex' & 'ratio'
        elements.forEach((elem) => {
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

        elements.forEach((elem) => {
            elem.addEventListener("click", (event) => {
                if (event.target.getAttribute("data-ratio")) {
                    ratio = +event.target.getAttribute("data-ratio");
                    localStorage.setItem("ratio", +event.target.getAttribute("data-ratio"));
                } else {
                    sex = event.target.getAttribute("id");
                    localStorage.setItem("sex", event.target.getAttribute("id"));
                }

                elements.forEach((elem) => {
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
    }

    //execution
    initLocalSettings("#gender div", "calculating__choose-item_active");
    initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
    calcTotal();

    getStaticInformation("#gender div", "calculating__choose-item_active");
    getStaticInformation(".calculating__choose_big div", "calculating__choose-item_active");

    getDynamicInformation("#height");
    getDynamicInformation("#weight");
    getDynamicInformation("#age");
}

module.exports = calculator;


/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class MenuCard {
        constructor(src, alt, title, description, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
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
                this.classes.forEach((className) => element.classList.add(className));
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
            </div>`;

            //push card to the rest
            this.parent.append(element);
        }
    }

    //getting data from the server
    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    //execution
    getResource("http://localhost:3000/menu").then((data) => {
        data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
        });
    });
}

module.exports = cards;


/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        success: "Успешно! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..",
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: data,
        });

        return await res.json();
    };

    //sending data from the form to the server
    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            //creating message block
            let statusMessage = document.createElement("img");
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            //converting FormData to JSON
            const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", jsonData)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(message.failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");

        prevModalDialog.classList.remove("show");
        prevModalDialog.classList.add("hide");
        openModalWinndow();

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
            closeModalWindow();
        }, 4000);
    }

    //execution
    forms.forEach((item) => {
        bindPostData(item);
    });
}

module.exports = forms;


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const contactBtns = document.querySelectorAll("[data-modal]"),
        modalWindow = document.querySelector(".modal"),
        modalTimerId = setTimeout(openModalWinndow, 300000);

    function openModalWinndow() {
        modalWindow.classList.add("show");
        modalWindow.classList.remove("hide");
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }

    function closeModalWindow() {
        modalWindow.classList.add("hide");
        modalWindow.classList.remove("show");
        document.body.style.overflow = "";
    }

    function showModalByScroll() {
        /* In this construction below,we subtract 1px from document.documentElement.scrollheight in 
    order to avoid bugs related to the technical characteristics of browsers and some monitors */

        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModalWinndow();
            removeEventListener("scroll", showModalByScroll);
        }
    }

    //execution
    contactBtns.forEach((item) => {
        item.addEventListener("click", openModalWinndow);
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target === modalWindow || e.target.getAttribute("data-close") === "") {
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow();
        }
    });

    window.addEventListener("scroll", showModalByScroll);
}

module.exports = modal;


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    let slideIndex = 1,
        offset = 0;

    const slides = document.querySelectorAll(".offer__slide"),
        prevBtn = document.querySelector(".offer__slider-prev"),
        nextBtn = document.querySelector(".offer__slider-next"),
        currentSlide = document.querySelector("#current"),
        totalSlides = document.querySelector("#total"),
        slidesWrapper = document.querySelector(".offer__slider-wrapper"),
        slidesField = document.querySelector(".offer__slider-inner"),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(".offer__slider");

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
        }

        //correct display
        if (index < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }
    }

    //displaying active indicator
    function showActiveSliderIndicator() {
        dots.forEach((dot, i) => {
            dot.style.opacity = ".5";
        });
        dots[slideIndex - 1].style.opacity = "1";
    }

    function removeNonDigits(str) {
        return +str.replace(/\D/g, "");
    }

    //execution
    showTotalSlides();
    showCurrentSlide(slideIndex);

    slidesWrapper.style.overflow = "hidden"; //hiding everything outside slidesWrapper

    slidesField.style.width = 100 * slides.length + `%`; //setting the width based on the number of slides

    //line up slides, add smooth transition (added class to CSS)
    // slidesField.style.display = "flex";
    // slidesField.style.transition = "0.5s all";

    //set a clear witdth for each slides
    slides.forEach((slide) => {
        slide.style.width = width;
    });

    //slider buttons
    nextBtn.addEventListener("click", () => {
        slideIndex++;
        showCurrentSlide(slideIndex);
        showActiveSliderIndicator();

        //check & changing indentation
        if (offset == removeNonDigits(width) * (slides.length - 1)) {
            //transition from the last slide to the first
            offset = 0;
        } else {
            //normal movement
            offset += removeNonDigits(width);
        }

        //sliderField motion
        slidesField.style.transform = `translateX(-${offset}px)`;
    });
    prevBtn.addEventListener("click", () => {
        slideIndex--;
        showCurrentSlide(slideIndex);
        showActiveSliderIndicator();

        //check & changing indentation
        if (offset == 0) {
            //transition from the first slide to the last
            offset = removeNonDigits(width) * (slides.length - 1);
        } else {
            //normal movement
            offset -= removeNonDigits(width);
        }

        //sliderField motion
        slidesField.style.transform = `translateX(-${offset}px)`;
    });

    //slider navigation

    slider.style.position = `relative`;

    //creating indicators
    const indicators = document.createElement("ol");

    indicators.classList.add("carousel-indicators");

    slider.append(indicators);

    //adding the required number of indicators
    for (let i = 0; i < slides.length; i++) {
        const indicator = document.createElement("li");

        indicator.classList.add("dot");
        indicator.setAttribute("data-number", i + 1);

        indicators.append(indicator);
    }

    const dots = document.querySelectorAll(".dot");

    //setting the initial active slide
    dots[slideIndex - 1].style.opacity = "1"; //initial active indicator

    offset = removeNonDigits(width) * (slideIndex - 1); //indent adjustment

    slidesField.style.transform = `translateX(-${offset}px)`; //initial slide

    //interaction with indicators
    indicators.addEventListener("click", (event) => {
        if (event.target && event.target.classList.contains("dot")) {
            slideIndex = event.target.getAttribute(["data-number"]);
            showCurrentSlide(slideIndex);

            //indent adjustment
            offset = removeNonDigits(width) * (slideIndex - 1);

            //movement
            slidesField.style.transform = `translateX(-${offset}px)`;

            showActiveSliderIndicator();
        }
    });
}

module.exports = slider;


/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        tabsParent = document.querySelector(".tabheader__items");

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, i) => {
                if (item === target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show", "fade");
        });

        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show", "fade");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }

    //execution
    hideTabContent();
    showTabContent();
}

module.exports = tabs;


/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadLine = "2022-04-01";

    //add zero to number
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    //calculates the remaining time
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            total: t,
            days,
            hours,
            minutes,
            seconds,
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

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    //execution
    setClock(".timer", deadLine);
}

module.exports = timer;


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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/


document.addEventListener("DOMContentLoaded", () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
        modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
        cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
        forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
        timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
        slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js"),
        calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

    tabs();
    modal();
    timer();
    cards();
    forms();
    slider();
    calculator();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map