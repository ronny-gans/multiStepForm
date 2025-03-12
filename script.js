const nameInput=document.querySelector("#fname");
const email=document.querySelector("#email");
const continueButton=document.querySelectorAll(".continue-button")
const submitButton=document.querySelector("button[type='submit'")
const nameError=document.querySelector("#name-error")
const mailError=document.querySelector("#email-error")
let confirmName=document.querySelector("#confirmName")
let confirmEmail=document.querySelector("#confirmEmail")



let currentStep=0;
showStep(currentStep)
continueButton[0].addEventListener("click",validateNameandEmail)
continueButton[1].addEventListener("click",validateCheckBoxes)
submitButton.addEventListener("click",submitForm)

function showStep(n) {
    let stepsCalculator=document.querySelector(".calculate-step p span")
    const sliders = document.querySelectorAll(".slider")
    let steps = document.querySelectorAll(".step");
    steps.forEach((step,index) => {
        step.style.display=index === n ? "block":"none";
    });
    stepsCalculator.textContent=currentStep+1;
    // remove active class from slider
    sliders.forEach(slider=>slider.classList.remove("active"))
    //add active class to current slider \
    if (sliders[n]) {
        sliders[n].classList.add("active")
    }
}
function validateNameandEmail() {
    const regexName=/^[a-zA-Z\s]+$/
    const regexMail=/^[a-zA-Z0-9.%_+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    let isValid=true
    //name validation
    if (nameInput.value.trim() ==="") {
        nameError.innerText="name can't be blank!"
        nameInput.classList.add("error")
        isValid = false
    } else if (!regexName.test(nameInput.value)) {
        nameError.innerText="enter a valid name!"
        nameInput.classList.add("error")
        isValid = false
    } else {
        nameError.innerText=""
        nameInput.classList.remove("error")
        confirmName.textContent=nameInput.value
    }
    //email validation
    if (email.value.trim()==="") {
        mailError.innerText="email can't be blank!"
        email.classList.add("error")
        isValid = false
    } else if (!regexMail.test(email.value)) {
        mailError.innerText="enter a valid email"
        email.classList.add("error")
        isValid=false
    } else {
        mailError.innerText=""
        email.classList.remove("error")
        confirmEmail.textContent=email.value
    }
    if (isValid) {
        currentStep++
        showStep(currentStep)
    }
    return isValid;
}
function validateCheckBoxes() {
    const checkBoxes=document.querySelectorAll(".topics:checked")
    const topicsError= document.querySelector("#topics-error")
    const confirmTopics = document.querySelector("#confirmTopics")
    if (checkBoxes.length==0) {
        topicsError.innerText="select at least 1 topic"
        return false
    } else {
        confirmTopics.innerHTML=""
        checkBoxes.forEach(checkBox=> {
            let topic=document.createElement("li");
            topic.textContent=checkBox.value;
            confirmTopics.appendChild(topic)
        }
        )
        currentStep++;
        showStep(currentStep)
        return true
    }
}
function submitForm() {
    //store name and email in local storage
    localStorage.setItem ("username",nameInput.value)
    localStorage.setItem("email",email.value)
    // store selected topics in JSON array
    const selectedTopics=[];
    document.querySelectorAll(".topics:checked").forEach(checkBox=>{
        selectedTopics.push(checkBox.value)
    });
    localStorage.setItem("topics".JSON.stringify(selectedTopics));
    //show success message
    alert("✅ Success")
    //reset form and return to step 0
    currentStep=0;
    showStep(currentStep)    
}