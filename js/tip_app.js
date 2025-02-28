document.addEventListener("DOMContentLoaded", () => {
  const bill = document.getElementById("billValue");
  const tipValue = document.getElementById("tipValue");
  const people = document.getElementById("peopleValue");
  const tipSection = document.querySelector(".cta-section");
  const resetButton = document.querySelector(".reset-button");

  let tipPercent = 0;

  tipSection.addEventListener("click", (e) => {
    for(let button of tipSection.children){
      button.classList.remove("selected");
    }
    const clickedButton = e.target.closest(".cta");
    if (clickedButton) {
      tipPercent = parseInt(clickedButton.dataset.value) / 100;
      tipValue.value = "";
      clickedButton.classList.add("selected");
    }
  });

  tipValue.addEventListener("input", (event) => {
    const expression = /^\d*\.?\d*$/;
    correctInput(expression, event);
    tipPercent = parseInt(event.target.value) / 100;
    validateInput(tipValue);
  });

  bill.addEventListener("input", (event) => {
    const expression = /^\d*\.?\d*$/;
    correctInput(expression, event);
    validateInput(bill);
  });

 

  people.addEventListener("input", (event) => {
    const expression = /^\d*$/;
    correctInput(expression, event);
    validateInput(people);
  });

  function calculateTip(billValue, peopleValue) {
    if (billValue > 0 && peopleValue > 0 && tipPercent > 0) {
      const tipAmount = ((billValue * tipPercent) / 100 / peopleValue).toFixed(
        2
      );
      console.log(tipAmount);
      return tipAmount;
    }
  }

  function calculateTotalAmount(billValue, peopleValue) {
    const tipAmount = calculateTip(billValue, peopleValue);
    const totalAmount = (
      billValue / peopleValue / 100 +
      parseFloat(tipAmount)
    ).toFixed(2);
    console.log(totalAmount);
    return totalAmount;
  }

  [bill, people].forEach((input) =>
    input.addEventListener("input", () => {
      // bill value changes in to cent for better accuracy
      const billValue = parseFloat(bill.value) * 100;
      console.log(billValue);
      const peopleValue = parseInt(people.value);
      const tip = calculateTip(billValue, peopleValue);
      const totalAmount = calculateTotalAmount(billValue, peopleValue);
      output(tip, totalAmount);
    })
  );

  resetButton.addEventListener("click", () => {
    bill.value = "";
    tipValue.value = "";
    people.value = "";
    output(0, 0);
    for(let button of tipSection.children){
      button.classList.remove("selected");
    }
  });

  function validateInput(input) {
    const inputName = input.name;
    const inputErrorText = document.querySelector(`.${inputName}-error`);
    if (input.value === "") {
      inputErrorText.textContent = "Can't be empty";
      inputErrorText.classList.add("show");
      inputErrorText.classList.remove("hide");
      input.style.outlineColor = "hsl(0, 100%, 73%)";
      return false;
    }else if(input.value === "0"){
      inputErrorText.textContent = "Can't be zero";
      inputErrorText.classList.add("show");
      inputErrorText.classList.remove("hide");
      input.style.outlineColor = "hsl(0, 100%, 73%)";
      return false;
    }
     else {
      inputErrorText.classList.add("hide");
      inputErrorText.classList.remove("show");
      input.style.outlineColor = "hsl(172, 67%, 45%)";
      return true;
    }
  }
  function correctInput(expression, event) {
    const value = event.target.value;
    const validValue = value.match(expression);
    if (!validValue) {
      event.target.value = value.slice(0, -1);
    }
  }

  function output(tip, totalAmount){
    const tipText = document.querySelector(".tip-value");
    const totalText = document.querySelector(".total-value");
    if(isNaN(tip)){
      tipText.textContent = `$0.00`;
    }else{
      tipText.textContent = `$${tip}`;
    }
    if(isNaN(totalAmount)){
      totalText.textContent = `$0.00`;
    }else{
      totalText.textContent = `$${totalAmount}`;
    }
  }
});
