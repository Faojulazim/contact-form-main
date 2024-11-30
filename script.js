const radioDiv = document.querySelectorAll("[data-radiodiv]");
const consent = document.querySelector("#consent");
const radioCheck = document.querySelector("[data-radiobtn]");
const firstName = document.querySelector("#fName");
const lastName = document.querySelector("#lName");
const email = document.querySelector("#emailAddr");
const message = document.querySelector("#message");
const submit = document.querySelector("#submitBtn");
const form = document.querySelector("form");

let isChecked = false;
let radioIsChecked = false;
let checkedElem;

consent.addEventListener("click", () => {
  isChecked = !isChecked;
  radioCheck.classList.toggle(
    "bg-[url('assets/images/icon-checkbox-check.svg')]"
  );
});

radioDiv.forEach((value) => {
  radioIsChecked = false;
  value.addEventListener("click", (e) => {
    if (value.classList.contains("bg-Green200Lighter")) {
      radioIsChecked = false;
    } else {
      radioIsChecked = true;
    }
    checkedElem = value;
    value.querySelector("input").checked = true;
    value
      .querySelector("input")
      .classList.toggle("bg-[url('assets/images/icon-radio-selected.svg')]");
    value.querySelector("input").classList.toggle("border");
    value.classList.toggle("bg-Green200Lighter");

    radioDiv.forEach((anotherValue) => {
      if (value !== anotherValue) {
        anotherValue.querySelector("input").checked = true;
        anotherValue
          .querySelector("input")
          .classList.remove(
            "bg-[url('assets/images/icon-radio-selected.svg')]"
          );
        anotherValue.querySelector("input").classList.add("border");
        anotherValue.classList.remove("bg-Green200Lighter");
      }
    });
  });
});

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
  if (radioIsChecked) {
    document.querySelector("#please").classList.add("hidden");
  } else {
    document.querySelector("#please").classList.remove("hidden");
    isValid = false;
  }
  return isValid;
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(checkedElem);
  if (validation() && radioIsChecked) {
    isChecked = false;
    document.getElementById("hiddenDiv").classList.remove("hidden");
    email.value = "";
    firstName.value = "";
    lastName.value = "";
    message.value = "";

    checkedElem.classList.remove("bg-Green200Lighter");
    checkedElem.querySelector("input").checked = false;
    checkedElem
      .querySelector("input")
      .classList.remove("bg-[url('assets/images/icon-radio-selected.svg')]");
    checkedElem.querySelector("input").classList.add("border");

    radioCheck.classList.remove(
      "bg-[url('assets/images/icon-checkbox-check.svg')]"
    );
    radioIsChecked = false;
    setTimeout(() => {
      document.getElementById("hiddenDiv").classList.add("hidden");
    }, 5000);
  }
});

form.addEventListener("input", (e) => {
  validation();
  e.preventDefault();
});
