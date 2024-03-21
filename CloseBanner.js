function setInitialTop() {
    let closeCta = document.querySelector("[data-cta='close']");
    let banner = document.querySelector("[data-wrapper='banner']");
    let navWithBar = document.querySelector("[data-wrapper='navbar']");
    let checkLocalStorage = localStorage.getItem("closed");
    let topToSet = window.getComputedStyle(banner).maxHeight;
    if (banner != undefined && navWithBar != undefined && closeCta != undefined) {
        closeCta.addEventListener("click", () => {
            navWithBar.style.top = `0px`;
            localStorage.setItem("closed", true);
        })
    }
    if(checkLocalStorage == null){
        banner.style.display = "block";
        navWithBar.style.top = topToSet;
    }
}

setInitialTop();