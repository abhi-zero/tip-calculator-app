document.addEventListener("DOMContentLoaded", () => {
  const bill = document.getElementById("billValue");
  const tipValue = document.getElementById("tipValue");
  const people = document.getElementById("peopleValue");
  const tipSection = document.querySelector(".cta-section");

  let tipPercent = 0;
 

        tipSection.addEventListener("click", (e) => {
            const clickedButton = e.target.closest(".cta");
            if (clickedButton) {
                tipPercent = parseInt(clickedButton.dataset.value) / 100;
                tipValue.value = "";
              }
          });

        tipValue.addEventListener('input', (event) => {
            tipPercent = parseInt(event.target.value) / 100;
            if (isNaN(tipPercent)) tipPercent = 0;
          }); 

  function calculateTip(billValue, peopleValue){
      if(billValue > 0 && peopleValue > 0 && tipPercent > 0){
        const tipAmount = (((billValue * tipPercent) / 100) / peopleValue).toFixed(2);
        console.log(tipAmount);
        return tipAmount;
      }
  }

  function calculateTotalAmount(billValue, peopleValue){
    const tipAmount = calculateTip(billValue, peopleValue);
    const totalAmount = (((billValue  / peopleValue)) + parseFloat(tipAmount));
    console.log(totalAmount);
    return totalAmount;
  }

  [bill, people].forEach((input) =>
      input.addEventListener("input", () => {
         // bill value changes in to cent for better accuracy
  const billValue = (parseFloat(bill.value)) * 100;
  console.log(billValue);
  const peopleValue = parseInt(people.value);
        calculateTip(billValue, peopleValue);
        calculateTotalAmount(billValue, peopleValue);
      })
  );
});
