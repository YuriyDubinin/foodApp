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
