//document.addEventListener("eventType",callback function)

// Dom Elements 

let formEl = document.getElementById("form");
let messageEl = document.getElementById("message");
let messageContainerEl = document.querySelector(".message-container");
let passwords = document.querySelectorAll(".password");


//Flags 

let isValid = false;
let passwordMatch = false;
let check1 = false;
let check2 = false; 
let storedData = {};

// validating form fields

/* const validateForm = () => {
    
    isValid = formEl.checkValidity();
    
    if (!isValid) {
        messageContainerEl.classList.remove("pass");
        messageEl.innerHTML = "Something is wrong";
        messageContainerEl.classList.add("fail");
        return false;
    }
    else {
        messageEl.innerHTML = "Registration Successful";
        messageContainerEl.classList.add("pass");
        return true;
    }
} */
const updateClasses = (domEl, addClass, removeClass) => {
    domEl.classList.remove(removeClass);
    domEl.classList.add(addClass);
  };
  
  const updateMessage = (message) => {
    messageEl.innerHTML = message;
  };
const validateForm = () => {
    isValid = formEl.checkValidity();
  
    // instructions
    if (!isValid) {
      updateMessage("Something is wrong");
      updateClasses(messageContainerEl, "fail", "pass");
      return false;
    } else {
      updateMessage("Registration successful");
      updateClasses(messageContainerEl, "pass", "fail");
      return true;
    }
  };
//Check password

const checkPassword = ()=>{
    let password1Value = passwords[0].value;
    let password2Value = passwords[1].value;
    if(password1Value === password2Value){ 
        passwordMatch = true;

        messageContainerEl.classList.remove("fail");
        messageContainerEl.classList.add("pass");
       
        passwords.forEach((password)=>{
            passwordMatch === true ? password.classList.remove("fail") + password.classList.add("pass") : ""
        })
        return true;
    }
    else{
        messageEl.innerHTML = "Password mismatch found";
        messageContainerEl.classList.remove("pass");
        messageContainerEl.classList.add("fail");
        passwords.forEach((password)=>{
            passwordMatch === false ? password.classList.remove("pass") + password.classList.add("fail") : ""
        })
        return false;
    }
}//Password validation ends here

//Store data 
const storeFormData = ()=>{
    storedData = {
        fullName : formEl.name.value,
        phNumber : formEl.phone.value,
        emailAddress : formEl.email.value,
        website : formEl.website.value,
        password : formEl.password1.value
    };
    console.log(storedData);
}

//Process form data
const processFormData = (event) => {
    event.preventDefault();
    
    //form validation before storing data
    check1 = validateForm();

    //Check Password match
    if(check1 === true){
        check2 = checkPassword();
    }
    
    //Store form data in db 
    if(check1 === true && check2 === true){
        storeFormData();
    }
}

//Event Listeners
formEl.addEventListener("submit", processFormData);