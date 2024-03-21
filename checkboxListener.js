function listenAndAddCheckBoxData() {
    let $checkboxContainer = document.querySelector(".checkbox-container");
    let $checkboxInputArray = $checkboxContainer?.querySelectorAll("[type='checkbox']");
    let $updateServiceElement = document.querySelector("[service-need='value']");

    if ($checkboxContainer && $checkboxInputArray?.length > 0) {
        $checkboxInputArray.forEach(item => {
            item.addEventListener("change", (evt) => {
                let serviceVal = evt.currentTarget.getAttribute("data-name");
                let updateValue = ($updateServiceElement?.value && $updateServiceElement.value + ",") + serviceVal;
                $updateServiceElement.value = updateValue;
            })
        })
    }
}