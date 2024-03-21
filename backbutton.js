function handleBackButton(){
    let backButton = document.querySelector(".back-button");
    if(backButton){
        backButton.addEventListener("click",()=>{
            window.history.back();
        })
    }
}

handleBackButton();