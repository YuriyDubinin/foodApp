"use strict";

document.addEventListener("DOMContentLoaded", () => {
    /* tabs */
    //variables
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

    //functions
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
    //variables
    const deadLine = "2021-12-31";

    //functions
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

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
    //variables
    const contactBtns = document.querySelectorAll("[data-modal]"),
        modalWindow = document.querySelector(".modal"),
        closeModalBtn = document.querySelector("[data-close]"),
        modalTimerId = setTimeout(openModalWinndow, 5000);

    //functions
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

    closeModalBtn.addEventListener("click", () => {
        closeModalWindow();
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target === modalWindow) {
            closeModalWindow();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow();
        }
    });

    window.addEventListener("scroll", showModalByScroll);
});
