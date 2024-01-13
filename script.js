const ballSelector = document.querySelector('#ball');
const buttonSelector = document.querySelector('#button');
const inputselector = document.querySelector('#input');
const errorSelector = document.querySelector('#error');
const API_ENDPOINT = 'https://yesno.wtf/api';
let isRequestInProgress = false;

const setDisabledButton = isDisabling => {
    if(isDisabling){
        buttonSelector.setAttribute('disabled','disabled');
    }else{
        buttonSelector.removeAttribute('disabled','disabled');
    }
    
}

const cleanUp = () => {
    setTimeout(() => {
        document.querySelector('#answer').innerHTML = '';
        inputselector.value = '';
        isRequestInProgress = false;
        setDisabledButton(false);
    },2000)
}

const showAnswer = (answer) => {
    setTimeout(() => {
        document.querySelector('#answer').innerHTML = `<p>${answer}</p>`;
        ballSelector.classList.remove('shake__ball');
        cleanUp();
    },1000)
};

const fetchAnswer = () => {
    isRequestInProgress = true;
    setDisabledButton(true);

    ballSelector.classList.add('shake__ball');

    fetch(API_ENDPOINT)
        .then(response => response.json())
        .then(data => showAnswer(data.answer))
};

const showError = () => {
    errorSelector.innerHTML = 'You need to tipe your question';

    setTimeout(() => {
        errorSelector.innerHTML = '';
    },3000)
}

const getRequest = () => {
    if(isRequestInProgress) return;
    if(!input.value) return showError();
    fetchAnswer();
}

const handleKeyEnter = (e) => {
    if (e.keyCode === 13) getRequest()  
};

buttonSelector.addEventListener('click', () => getRequest());
