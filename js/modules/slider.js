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
