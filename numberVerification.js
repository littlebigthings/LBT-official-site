class LEADFORMSUBMISSION {
    constructor($formElm) {
        this.$formElement = $formElm;
        this.$inputElement = this.$formElement.querySelector("[data-input='number']");
        this.$sendData = this.$formElement.querySelector("[data-input='add-number']")
        this.inputPlugin = null;
        this.inputValue = null;
        this.country= null;
        this.init();
    }

    init() {
        this.$inputElement.style.borderColor = "#100938";
        this.addPlugin();
        this.addListener();
    }

    addPlugin() {
        this.inputPlugin = window.intlTelInput(this.$inputElement, {
            initialCountry: "auto",
            separateDialCode: true,
            geoIpLookup: (success, failure) => {
                $.get("https://ipinfo.io", function () { }, "jsonp").always((resp) => {
                    var countryCode = (resp && resp.country) ? resp.country : "us";
                    if(countryCode != "US" && countryCode != "IN"){
                        this.$inputElement.parentElement.style.display="none";
                    }
                    success(countryCode);
                });
            },
            preferredCountries:["us","in"],
        });
    }

    addListener() {
        this.$inputElement.addEventListener('blur', (event) => {
            let hasData = event.target.value;
            if (hasData.length > 0) {
                if (this.validateNumber()) {
                    this.$sendData.value = this.inputValue;
                    this.$inputElement.setCustomValidity('');
                }
                else if (!this.validateNumber()) {
                    this.$inputElement.setCustomValidity('Please enter a valid phone number.');
                    this.$inputElement.reportValidity();
                }
            }else{
                this.$inputElement.setCustomValidity('');
            }
        }, true);
    }

    validateNumber() {
        let number = this.inputPlugin.getNumber(intlTelInputUtils.numberFormat.E164);
        if (number.length > 0 && this.inputPlugin.isValidNumber()) {
            this.inputValue = number
            return true;
        }
        return false;
    }

}
let formElm = document.querySelector("[data-form='leadform']");
if (formElm != undefined) new LEADFORMSUBMISSION(formElm);