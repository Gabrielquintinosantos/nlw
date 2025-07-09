const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionSelect');
const askButton = document.getElementById('askButton');
const form = document.getElementById('form');
const aiResponse = document.getElementById('aiResponse');

const enviarFormulario = (event) => {

    event.preventDefault();
    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;
    
    console.log({game, apiKey, question});
    
    if(apiKey == '' || game == '' || question == '') {

        alert('Por favor, preencha todos os campos.')
        return;
    
    } 

    askButton.textContent = 'Enviando...';
    askButton.disabled = true;
    askButton.classList.add('loading');
}

form.addEventListener('submit', enviarFormulario);