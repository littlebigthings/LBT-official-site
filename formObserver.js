class OBSERVEFORMSUCCESS {
    constructor() {
        this.paramsFromUrl = (new URL(document.location)).searchParams;
        this.utmDataToPass = {};
        this.$formElement = document.querySelectorAll("[data-form='observe']");
        this.$successWrapper;
        this.$popupWrapper = document.querySelector("[data-wrapper='popup']");
        this.$closePopup = document.querySelector("[data-cta='close']");
        this.options = {
            attributes: true
        }
        this.observer = new MutationObserver(this.handleMutation.bind(this))
        this.init();
    }

    init() {
        this.getUtmParams();
        this.startObserver();
    }

    getUtmParams() {
        if (document.location.search.length > 0 && this.paramsFromUrl) {
            this.paramsFromUrl.forEach((key, value) => {
                this.utmDataToPass[`${value}`] = key;
            });
        };
    }

    startObserver() {
        if (this.$formElement.length > 0) {
            for (let item = 0; item < this.$formElement.length; item++) {
                this.$successWrapper = this.$formElement[item].querySelector("[wrapper='success']");
                this.observer.observe(this.$successWrapper, this.options);
            }
        }
        if (this.$closePopup != undefined) {
            this.$closePopup.addEventListener("click", () => {
                this.closePopup();
            })
        }
    }

    handleMutation(mutationList, observer) {
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                if (mutation.target.style.display == "block") {
                    console.log(this.utmDataToPass)
                    gtag('event', 'sign_up', this.utmDataToPass);
                    setTimeout(() => {
                        this.openpopup();
                    }, 500)
                }
            }
        })
    }

    openpopup() {
        this.$popupWrapper.classList.remove("hide-popup")
    }
    closePopup() {
        this.$popupWrapper.classList.add("hide-popup")
    }

}
new OBSERVEFORMSUCCESS();