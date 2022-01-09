"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* tabs */
    //declaration
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

    /* timer */
    //declaration
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

    /* modal window */
    //declaration
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

    /* cards, in this block we are uses classes */
    //declaration
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

    //execution
    //add Fitness card
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",
        "menu__item"
    ).render();

    //add Premium card
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        21,
        ".menu .container",
        "menu__item"
    ).render();

    //add Lenten card
    new MenuCard(
        "img/tabs/post.jpg",
        "lenten",
        'Меню "Постное"',
        "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        16,
        ".menu .container",
        "menu__item"
    ).render();

    //add Hamburger card
    new MenuCard(
        "img/tabs/hamburger.jpg",
        "hamburger",
        'Меню "Бургеры"',
        "Меню “Бургеры” - для настоящих ценителей мяса, для тех кто знает как сочетать все что нужно, и того ктоживет в гармонии с собой зная что все хорошо в меру. Отборная телятина, вкусный сыр и хрустяие ломтики зелени - просто объедение.",
        16,
        ".menu .container",
        "menu__item"
    ).render();

    //add Sea card
    new MenuCard(
        "img/tabs/sea_menu.jpg",
        "sea_menu",
        'Меню "Средиземноморское"',
        "В “Средиземноморском” меню собраны настоящие деликатесы собранные с самых дальных уголков водного мира. Королевские креветки, мидии, устрицы, рапаны, красная рыба и многое другое не оставят вас равнодушными.",
        16,
        ".menu .container",
        "menu__item"
    ).render();

    //add Pizza card
    new MenuCard(
        "img/tabs/pizza.jpg",
        "pizza",
        'Меню "Пицца"',
        "Что тут скажешь? Говорят чтобы вкусить все прелести конкретной кухни надо для начала попробовать Маргариту, но в нашем меню можно пробовать что угодно, каждый кусочек пропитан классическим вкусом для настоящих ценителей.",
        16,
        ".menu .container",
        "menu__item"
    ).render();

    /* replaces content of menu of the day */
    //declaration
    const menuItems = document.querySelectorAll(".menu__item");
    const switchTimer = setInterval(switchContentOfMenuOfTheDay, 15000);

    //function to replace content for the menu of the day
    function switchContentOfMenuOfTheDay() {
        if (
            menuItems[0].classList.contains("show") &&
            menuItems[1].classList.contains("show") &&
            menuItems[2].classList.contains("show")
        ) {
            menuItems[0].classList.remove("show", "fade");
            menuItems[1].classList.remove("show", "fade");
            menuItems[2].classList.remove("show", "fade");
            menuItems[0].classList.add("hide");
            menuItems[1].classList.add("hide");
            menuItems[2].classList.add("hide");

            menuItems[3].classList.remove("hide");
            menuItems[4].classList.remove("hide");
            menuItems[5].classList.remove("hide");
            menuItems[3].classList.add("show", "fade");
            menuItems[4].classList.add("show", "fade");
            menuItems[5].classList.add("show", "fade");
        } else {
            menuItems[0].classList.remove("hide");
            menuItems[1].classList.remove("hide");
            menuItems[2].classList.remove("hide");
            menuItems[0].classList.add("show", "fade");
            menuItems[1].classList.add("show", "fade");
            menuItems[2].classList.add("show", "fade");

            menuItems[3].classList.remove("show", "fade");
            menuItems[4].classList.remove("show", "fade");
            menuItems[5].classList.remove("show", "fade");
            menuItems[3].classList.add("hide");
            menuItems[4].classList.add("hide");
            menuItems[5].classList.add("hide");
        }
    }

    //execution
    //content initial position
    menuItems[0].classList.add("show", "fade");
    menuItems[1].classList.add("show", "fade");
    menuItems[2].classList.add("show", "fade");
    menuItems[3].classList.add("hide");
    menuItems[4].classList.add("hide");
    menuItems[5].classList.add("hide");

    /* forms */
    //declaration
    const forms = document.querySelectorAll("form");
    const message = {
        loading: "img/form/spinner.svg",
        success: "Успешно! Скоро мы с вами свяжемся!",
        failure: "Что-то пошло не так..",
    };

    //sending data from the form to the server
    function postData(form) {
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

            const request = new XMLHttpRequest();
            const formData = new FormData(form);

            request.open("POST", "server.php");

            //for FormData setRequestHeader not needed
            // request.setRequestHeader("Content-type", "multypart/form-data");

            //for JSON
            request.setRequestHeader("Content-type", "application/json");

            //converting FormData to JSON
            const object = {};
            formData.forEach((value, key) => {
                object[key] = value;
            });

            const json = JSON.stringify(object);

            request.send(json);

            request.addEventListener("load", () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    //clear the form
                    statusMessage.remove();
                    form.reset();
                } else {
                    showThanksModal(message.failure);
                }
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
        postData(item);
    });
});
