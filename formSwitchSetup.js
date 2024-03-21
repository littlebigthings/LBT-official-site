class FORMHANDLER {
    constructor() {
        this.paramsFromUrl = (new URL(document.location)).searchParams;
        this.utmDataToPass = {};
        this.$formElement = document.querySelector("[data-form='observe']");
        this.$htmlFormElement = this.$formElement?.querySelector("[data-form='leadform']");
        this.$requestBtn = this.$formElement.querySelector("[btn='send-request']");
        this.$bookCallBtn = this.$formElement.querySelector("[btn='book-a-call']");
        this.$radioButtonArray = [...this.$formElement?.querySelectorAll("[item='radio-btn']")];
        this.wrappersToToggle = this.$formElement?.querySelectorAll("[form-block-hide='Monthly / Hourly']");
        this.textToToggle = this.$formElement?.querySelector("[btn-hide='Monthly / Hourly']");
        this.$radioTrigger = document.querySelectorAll("[set-plan]");
        this.$successWrapper;
        this.formData = {};
        this.options = {
            attributes: true
        }
        this.observer = new MutationObserver(this.handleMutation.bind(this))
        this.redirectTo = null;
        this.redirectionUrl = null;
        this.init();
    }

    init() {
        this.radioChangeTrigger();
        this.getUtmParams();
        this.startObserver();
        this.activateRadioListener();
        this.submitBtnListener();
    }

    radioChangeTrigger(){

        this.$radioTrigger.forEach(trigger =>{
            trigger.addEventListener("click",(evt)=>{
                let targetElementType = evt.currentTarget?.getAttribute("set-plan");
                let radioToClick = this.$radioButtonArray.filter(button=> button.querySelector("input").value == targetElementType);
               radioToClick.length>0&&radioToClick[0].click();
            })
        })

    }

    getUtmParams() {
        if (document.location.search.length > 0 && this.paramsFromUrl) {
            this.paramsFromUrl.forEach((key, value) => {
                this.utmDataToPass[`${value}`] = key;
            });
        };
    }

    startObserver() {
        this.$successWrapper = this.$formElement.querySelector("[wrapper='success']");
        this.observer.observe(this.$successWrapper, this.options);
    }

    handleMutation(mutationList, observer) {
        mutationList.forEach((mutation) => {
            if (mutation.type === 'attributes') {
                if (mutation.target.style.display == "block") {
                    let formSubmittedData = new FormData(this.$htmlFormElement)
                    for (let pair of formSubmittedData.entries()) {
                        this.formData[pair[0]] = pair[1];
                    }
                    this.setRedirection()

                }
            }
        })
    }

    activateRadioListener(){
        this.$radioButtonArray.forEach(radio =>{
            let radioInput = radio.querySelector("input");
            radioInput.addEventListener("click",(evt)=>{
                let radioValue = evt.currentTarget?.value;
                this.activateOrDeactivateElements(radioValue)
            })
        })
    }

    activateOrDeactivateElements(value){
       
        this.wrappersToToggle?.forEach(wrapper =>{
            let requiredInputs = wrapper?.querySelectorAll("input");
            requiredInputs?.forEach(inputItem =>{
                if(value =="Scoped Project"){
                    let enableRequired = inputItem?.getAttribute("enable-required");
                    if(enableRequired){
                    inputItem.setAttribute("required", true);
                    }
                }
                else if(value == "Monthly / Hourly"){
                    let isRequired = inputItem?.required;
                    if(isRequired){
                    inputItem.removeAttribute("required");
                    inputItem?.setAttribute("enable-required", true);
                    }
                }
            })
            
            wrapper.style.display=value=="Scoped Project"?"flex":"none";
        })
        this.textToToggle.style.display = value=="Scoped Project"?"block":"none";
        value=="Scoped Project"?this.$bookCallBtn.classList.add("secondary-combo"):this.$bookCallBtn.classList.remove("secondary-combo")
        value=="Scoped Project"?this.$requestBtn.style.display = "block":this.$requestBtn.style.display = "none"
    }

    submitBtnListener(){
        this.$requestBtn.addEventListener("click",()=>{
            this.redirectionUrl = "/thank-you";
        })
        this.$bookCallBtn.addEventListener("click",()=>{
            this.redirectionUrl = "/book-a-call";
        })

    }

    setRedirection(){
        if (this.redirectionUrl) {
            const existingSearchParams = window.location.search;
            const finalRedirectionUrl = `${this.redirectionUrl}?${existingSearchParams}`;
            window.location.href = finalRedirectionUrl;
        }
    }

}
new FORMHANDLER();