const radioBtn = document.querySelectorAll("[data-radio]");
const radioDiv = document.querySelectorAll("[data-radiodiv]");
const radioCheck = document.querySelector("[data-radiobtn]");
const consent = document.querySelector("#consent");
const firstName = document.querySelector("#fName");
const lastName = document.querySelector("#lName");
const email = document.querySelector("#emailAddr");
const message = document.querySelector("#message");
const submit = document.querySelector("#submitBtn");
const form = document.querySelector("form");

let isChecked = false;
let clickedElem;
let radioIsChecked = false;

consent.addEventListener("click", () => {
  isChecked = !isChecked;
  radioCheck.classList.toggle(
    "bg-[url('assets/images/icon-checkbox-check.svg')]"
  );
});

radioDiv.forEach((element) => {
  element.addEventListener("click", (e) => {
    const input = element.querySelector("input");
    input.checked = !input.checked;
    if (input.checked) {
      element.classList.add("bg-Green200Lighter");
      input.classList.add("bg-[url('assets/images/icon-radio-selected.svg')]");
      input.classList.add("border-0");
    } else {
      element.classList.remove("bg-Green200Lighter");
      input.classList.remove(
        "bg-[url('assets/images/icon-radio-selected.svg')]"
      );
      input.classList.remove("border-0");
    }
    clickedElem = element;
    radioDiv.forEach((anotherElement) => {
      if (anotherElement !== element) {
        const anotherInput = anotherElement.querySelector("input");
        anotherInput.checked = false;
        anotherElement.classList.remove("bg-Green200Lighter");
        anotherInput.classList.remove(
          "bg-[url('assets/images/icon-radio-selected.svg')]"
        );
        anotherInput.classList.remove("border-0");
      }
    });
    validateRadioButtons();
  });
});

function validateRadioButtons() {
  radioIsChecked = false;

  radioDiv.forEach((elem) => {
    if (elem.querySelector("input").checked) {
      radioIsChecked = true;
    }
  });

  const errorMessage =
    radioDiv[0].parentElement.parentElement.parentElement.lastElementChild;
  if (radioIsChecked) {
    errorMessage.classList.add("hidden");
  } else {
    errorMessage.classList.remove("hidden");
  }
}

function validation() {
  let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  let emailValue = email.value;
  let isValid = true;
  if (!firstName.value.length) {
    firstName.nextElementSibling.classList.remove("hidden");
    firstName.classList.add("border-Red");
    isValid = false;
  } else {
    firstName.nextElementSibling.classList.add("hidden");
    firstName.classList.remove("border-Red");
  }

  if (!lastName.value.length) {
    lastName.nextElementSibling.classList.remove("hidden");
    lastName.classList.add("border-Red");
    isValid = false;
  } else {
    lastName.nextElementSibling.classList.add("hidden");
    lastName.classList.remove("border-Red");
  }
  if (!emailValue.length) {
    email.nextElementSibling.innerText = "This field is required";
    email.nextElementSibling.classList.remove("hidden");
    email.classList.add("border-Red");
    isValid = false;
  } else if (!regex.test(emailValue) && emailValue.length) {
    email.nextElementSibling.innerText = "Invalid Email";
    email.nextElementSibling.classList.remove("hidden");
    email.classList.add("border-Red");
    isValid = false;
  } else {
    email.nextElementSibling.classList.add("hidden");
    email.classList.remove("border-Red");
  }

  if (!message.value.length) {
    message.nextElementSibling.classList.remove("hidden");
    message.classList.add("border-Red");
    isValid = false;
  } else if (message.value.length < 1) {
    message.nextElementSibling.classList.remove("hidden");
    message.nextElementSibling.innerText = "Message must include 50 characters";
    isValid = false;
    message.classList.add("border-Red");
  } else {
    message.nextElementSibling.classList.add("hidden");
    message.classList.remove("border-Red");
  }

  if (!isChecked) {
    document.querySelector("#consentPara").classList.remove("hidden");
    isValid = false;
  } else {
    document.querySelector("#consentPara").classList.add("hidden");
  }
  validateRadioButtons();
  return isValid;
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (validation() && radioIsChecked) {
    isChecked = false;
    document.getElementById("hiddenDiv").classList.remove("hidden");
    email.value = "";
    firstName.value = "";
    lastName.value = "";
    message.value = "";
    clickedElem.classList.remove("bg-Green200Lighter");
    clickedElem.querySelector("input").checked = false;
    clickedElem
      .querySelector("input")
      .classList.remove("bg-[url('assets/images/icon-radio-selected.svg')]");
    clickedElem.querySelector("input").classList.remove("border-0");
    radioCheck.classList.remove(
      "bg-[url('assets/images/icon-checkbox-check.svg')]"
    );

    setTimeout(() => {
      document.getElementById("hiddenDiv").classList.add("hidden");
    }, 5000);
  }
});
form.addEventListener("input", (e) => {
  validation();
  e.preventDefault();
});
