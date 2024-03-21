class addSlickSlider {
    constructor(sliderObj) {
        this.sliderObj = sliderObj;
        this.$sliderParent = this.sliderObj.sliderParent;
        this.dots = this.sliderObj.dots;
        this.slidesToScroll = this.sliderObj.slidesToScr;
        this.slidesToShow = this.sliderObj.slidesToS;
        this.infinite = this.sliderObj.infinite;
        this.autoplay = this.sliderObj.autoplay;
        this.autoplaySpeed = this.sliderObj.autoplaySpeed;
        this.arrows = this.sliderObj.arrows;
        this.speed = this.sliderObj.spee;
        this.fade = this.sliderObj.fade;
        this.nextArrow = this.sliderObj.nextArrow;
        this.prevArrow = this.sliderObj.prevArrow;
        this.centerMode = this.sliderObj.centerMode;
        this.slidesToShowOnMob = this.sliderObj.responsive ? this.sliderObj.responsive.slidesToShow : 1;
        this.initElement();
    }

    initElement() {
        if (this.$sliderParent.length <= 0) return;
        this.$sliderParent.forEach(element => {
            let sliderWrapper = element.querySelector("[slick-slider='slider-child']");//Add this attribute to slider item.
            let $paginationBox = element.querySelector("[slick-slider='bread-crums-box']"); //Add this attribute to pagination dot wrapper.
            this.activateSlider({ sliderWrapper, $paginationBox });
        });
    }

    activateSlider(sliderObj) {
        let sliderControl = $(sliderObj.sliderWrapper).slick({
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
            variableWidth: true,
            prevArrow: this.prevArrow,
            nextArrow: this.nextArrow,
            appendDots: this.dots != false ? sliderObj.$paginationBox : "none", //set this wrapper to relative.
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: this.slidesToShowOnMob,
                    }
                }
            ]
        });
    }
}
// activate slider
let sliderObjTwo = {
    sliderParent: document.querySelectorAll("[slick-slider='parent']"),
    slidesToShow: 3,
    slidesToScroll: 1, //This won't work when center mode in on/true.
    infinite: true,
    autoplay: false,
    autoplaySpeed: 3000,
    speed: 500,
    fade: false,
    centerMode: true,
    dots: true,
    arrows: true,
    prevArrow: document.querySelector("[slider-arrow='prev']"),
    nextArrow: document.querySelector("[slider-arrow='next']"),
    slidesToShowOnMob:1,
}
new addSlickSlider(sliderObjTwo)