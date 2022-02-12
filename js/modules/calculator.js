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

export default calculator;
