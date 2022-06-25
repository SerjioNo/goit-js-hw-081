import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = "feedback-form-state";

const formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

setFormOnReset();

function onFormSubmit(event) {
    event.preventDefault();

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    console.log(formData); 
};

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    const inputText = JSON.stringify(formData);
    localStorage.setItem(STORAGE_KEY, inputText);
 };

function setFormOnReset() {

    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
 
    if (!savedData) {
        form.elements.email.value = "";
        form.elements.message.value = "";
        return
    }    
    if (savedData.message && !savedData.email) {
        form.elements.message.value = savedData.message;
        form.elements.email.value = "";
    } else if (savedData.email && !savedData.message) {
        form.elements.email.value = savedData.email;
       form.elements.message.value = "";        
    } else {
       form.elements.message.value = savedData.message;
        form.elements.email.value = savedData.email;
    }
};
