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
    }

    //execution
    contactBtns.forEach((item) => {
        item.addEventListener("click", () => openModalWinndow(modalSelector, modalTimerId));
    });

    modalWindow.addEventListener("click", (e) => {
        if (e.target === modalWindow || e.target.getAttribute("data-close") === "") {
            closeModalWindow(modalSelector);
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modalWindow.classList.contains("show")) {
            closeModalWindow(modalSelector);
        }
    });

    window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModalWinndow, closeModalWindow };
