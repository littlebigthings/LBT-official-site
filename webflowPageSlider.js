class addSlickSlider {
    constructor(sliderObj) {
        this.sliderObj = sliderObj;
        this.$sliderParent = this.sliderObj.sliderParent;
        this.dots = this.sliderObj.dots ?? true;
        this.slidesToScroll = this.sliderObj.slidesToScroll ?? 1;
        this.slidesToShow = this.sliderObj.slidesToShow ?? 1;
        this.infinite = this.sliderObj.infinite ?? false;
        this.autoplay = this.sliderObj.autoplay ?? true;
        this.autoplaySpeed = this.sliderObj.autoplaySpeed ?? 1000;
        this.arrows = this.sliderObj.arrows ?? true;
        this.speed = this.sliderObj.speed ?? 500;
        this.fade = this.sliderObj.fade ?? false;
        this.nextArrow = this.sliderObj.nextArrow;
        this.prevArrow = this.sliderObj.prevArrow;
        this.adaptiveHeight = this.sliderObj.adaptiveHeight ?? false;
        this.centerMode = this.sliderObj.centerMode ?? false;
        this.showonRespOnDesk = this.sliderObj.respOnDeskSmall;
        this.showonRespOnTablet = this.sliderObj.respOnTablet;
        this.showonRespOnMobile = this.sliderObj.respOnMobile;
        this.enableWheel = this.sliderObj.enableWheel ?? false;
        this.handleArrows = this.sliderObj.handleArrows ?? false;
        this.initElement();

    }

    initElement() {
        if (this.$sliderParent.length <= 0) return;
        this.$sliderParent.forEach(element => {
            let sliderWrapper = element.querySelector("[slick-slider='activate']");
            let $paginationBox = element.querySelector("[slick-slider='bread-crums-box']"); 
            let prevArrow = element.querySelector("[arrow='prev']");
            let nextArrow = element.querySelector("[arrow='next']");
            this.activateSlider({ sliderWrapper, prevArrow, nextArrow, $paginationBox });
        });
    }

    activateSlider(sliderToActivate) {

        let sliderControl = $(sliderToActivate.sliderWrapper).slick({
            dots: this.dots,
            slidesToShow: this.slidesToShow,
            slidesToScroll: this.slidesToScroll,
            centerMode: this.centerMode,
            infinite: this.infinite,
            autoplay: this.autoplay,
            autoplaySpeed: this.autoplaySpeed,
            arrows: this.arrows,
            speed: this.speed,
            fade: this.fade,
            prevArrow: sliderToActivate.prevArrow,
            nextArrow: sliderToActivate.nextArrow,
            adaptiveHeight: this.adaptiveHeight,
            appendDots: this.dots != false ? sliderToActivate.$paginationBox : "none",
            responsive: [{
                breakpoint: 1030,
                settings: {
                    slidesToShow: this.showonRespOnDesk,
                    centerMode: this.centerMode
                }
            },
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: this.showonRespOnTablet,
                    centerMode:  this.centerMode
                }
            },

            {
                breakpoint: 500,
                settings: {
                    slidesToShow: this.showonRespOnMobile,
                    centerMode:  this.centerMode
                }
            }
            ]

        });
        if (this.handleArrows) {
            this.enableDisableArrows(sliderToActivate.nextArrow, sliderToActivate.prevArrow, sliderToActivate);
        }
        
    }
    enableDisableArrows(nextArrow, prevArrow, sliderToActivate) {
        let nextDisabledArrow = nextArrow?.querySelector("[arrow-disable='next']");
        let nextEnableArrow = nextArrow?.querySelector("[arrow-enable='next']");
        let prevDisabledArrow = prevArrow?.querySelector("[arrow-disable='prev']");
        let prevEnableArrow = prevArrow?.querySelector("[arrow-enable='prev']");
        nextEnableArrow.style.display = "block";
        prevEnableArrow.style.display = "none";
        nextDisabledArrow.style.display = "none";
        prevDisabledArrow.style.display = "block";
        $(sliderToActivate.sliderWrapper).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          nextEnableArrow.style.display = "block";
          prevEnableArrow.style.display = "block";
          nextDisabledArrow.style.display = "none";
          prevDisabledArrow.style.display = "none";
        if (nextSlide === 0) {
            prevEnableArrow.style.display = "none";
            prevDisabledArrow.style.display = "block";
        }
        if (nextSlide === slick.slideCount - 1) {
            nextEnableArrow.style.display = "none";
            nextDisabledArrow.style.display = "block";
        }
        });
    }
}
let sliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='slick-slider']"),
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: false,
    dots: false,
    arrows: true,
    respOnDeskSmall: 1,
    respOnTablet: 1,
    respOnMobile: 1,
}
let workSliderObj = {
    sliderParent: document.querySelectorAll("[wrapper='work-slick-slider']"),
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 600,
    fade: false,
    centerMode: true,
    adaptiveHeight: true,
    variableWidth: true,
    dots: true,
    arrows: true,
    handleArrows: true,
}

document.addEventListener("DOMContentLoaded", (event) => {
    new addSlickSlider(sliderObj)
    new addSlickSlider(workSliderObj)
});