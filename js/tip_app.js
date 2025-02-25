document.addEventListener("DOMContentLoaded", () => {
  const bill = document.getElementById("billValue");
  const tip = document.getElementById("tipValue");
  const people = document.getElementById("peopleValue");
  const tipSection = document.querySelector(".cta-section");

  getTipValue(tip, tipSection);
  function getTipValue(tipValue, fixedTipSection) {
    let tip;
    if (tipValue.value == "") {
        fixedTipSection.addEventListener("click", (e) => {
            const clickedButton = e.target.closest(".cta");
            if (clickedButton) {
                const selectedValue = clickedButton.dataset.value;
                tip = selectedValue;
                console.log(tip);
              }
              return tip;
          });
        }
    if(tipValue.value !== "0"){
        tipValue.addEventListener('input', (event) => {
            tip = event.target.value;
            console.log(tip);
            return tip;
          }); 
    }
  }


});
