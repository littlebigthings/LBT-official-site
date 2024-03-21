class MAPUTMPARAMS {
    constructor() {
        this.paramsFromUrl = (new URL(document.location)).searchParams;
        this.DataToStoreInCookie = {};
        this.DataFromCookie = null;
        this.stringData = null;
        this.init();
    }

    init() {
        this.mapCookie();
        this.mapGAData();
    }

    // code to map utm params into cookie.
    mapCookie() {
        if (document.location.search.length>0 && this.paramsFromUrl) {
            this.paramsFromUrl.forEach((key, value) => {
                this.DataToStoreInCookie[`${value}`] = key;
            });
            
            this.stringData = JSON.stringify(this.DataToStoreInCookie);
            this.setCookie("UTMDATA", this.stringData, 1);

            let rawData = this.getDataFromCookie("UTMDATA");
            this.DataFromCookie = rawData != null && rawData.length > 0 ? JSON.parse(rawData) : null;
            if (this.DataFromCookie != null) this.addFormFields();
        } else {
            let rawData = this.getDataFromCookie("UTMDATA");
            this.DataFromCookie = rawData != null && rawData.length > 0 ? JSON.parse(rawData) : null;
            if (this.DataFromCookie != null) this.addFormFields();
        }
    }

    // code to get the UTM data from cookie.
    getDataFromCookie(cookieName) {
        let nameEQ = cookieName + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // code to set cookie value
    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // code to add hidden fields into forms to store UTM values.
    addFormFields() {
        if(this.DataFromCookie == null && Object.keys(this.DataFromCookie).length == 0)return;
        let allForms = document.querySelectorAll("form");
        if(allForms.length == 0)return;
        allForms.forEach(form => {
            Object.keys(this.DataFromCookie).forEach(key => {
                let getTheInputElement = document.querySelector(`[${key}]`);
                getTheInputElement.value = this.DataFromCookie[key];
                // let inputElement = document.createElement("input");
                // inputElement.type = "text";
                // inputElement.name = key;
                // inputElement.setAttribute(key, this.DataFromCookie[key]);
                // inputElement.style.display = "none";
                // form.appendChild(inputElement);
            })
        })
    }

   async mapGAData(){
        let gaSessionElement = document.querySelector("[ga-session-id]");
        let gaUserElement = document.querySelector("[ga-user-id]");

        await gtag('get', 'G-FCNMK8CGH8', 'client_id',(field)=>
        gaUserElement.value = field);
        await gtag('get', 'G-FCNMK8CGH8', 'session_id',(field)=>
        gaSessionElement.value = field);
    }
}

new MAPUTMPARAMS;