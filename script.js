const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionSelect');
const askButton = document.getElementById('askButton');
const form = document.getElementById('form');
const aiResponse = document.getElementById('aiResponse');

//AIzaSyBQxlcwShNW_wMO0jkZUxmXeB4sSN8fugA - Chave de API*//
const askAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const ask = `olha, tenho esse jogo ${game}, e gostaria de saber ${question}
    `
    const contents = [{
        parts: [{
            text: ask
            }]
    }]
//Chamada API*//

const response = await fetch(geminiURL, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        contents
    })
})

const data = await response.json()
console.log({ data })
return
}

const enviarFormulario = async (event) => {
    event.preventDefault();
    const apiKey = apiKeyInput.value;
    const game = gameSelect.value;
    const question = questionInput.value;
    
    
    if(apiKey == '' || game == '' || question == '') {

        alert('Por favor, preencha todos os campos.');
        return;
    
    } 
    askButton.disabled = true;
    askButton.textContent = 'Enviando...';
    askButton.classList.add('loading');
    
    try { // Perguntar para a IA*//

        await askAI(question, game, apiKey)
        

    }   catch (error) {

        console.log('Erro: ', error);
        alert('Ocorreu um erro ao enviar a pergunta. Por favor, tente novamente.');

    }   finally {
        askButton.disabled = false;
        askButton.textContent = 'Perguntar';
        askButton.classList.remove('loading');
    }

}

form.addEventListener('submit', enviarFormulario);