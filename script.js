const apiKeyInput = document.getElementById('apiKey');
const gameSelect = document.getElementById('gameSelect');
const questionInput = document.getElementById('questionSelect');
const askButton = document.getElementById('askButton');
const form = document.getElementById('form');
const aiResponse = document.getElementById('aiResponse');
const markdownToHTML = (text) => {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
}




//AIzaSyBQxlcwShNW_wMO0jkZUxmXeB4sSN8fugA - Chave de API*//
const askAI = async (question, game, apiKey) => {
    const model = "gemini-2.5-flash";
    const geminiURL = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
    const ask = `
    ## Especialidade
    Voce é um especialista assitente de meta do jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base do seu conhecimento do jogo, estratégias, builds, dicas e combos das habilidades

    ## Regras
    -Se você não souber a responta, responda com "Slk num compensa" e não tente inventar uma resposta.
    -Se a pergunta não for relacioanadda ao jogo, responda com "Slk num compensa, que jogo é esse parça?"
    - Considere a data atual ${new Date().toLocaleDateString()}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.
    }
    ## Resposta
    - Economize na resposta, seja direto e responda no máximo com 1000 caracteres.
    - Responda em markdown
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta do usuário.

    ---

    Aqui está a pergunta do usuário: ${question}
    `
    const contents = [{
        role: "user",
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
        contents,
        tools
    })
})

const data = await response.json()
return data.candidates[0].content.parts[0].text
}

const tools = [{
    google_search: {}
}]

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

        const text = await askAI(question, game, apiKey)
        aiResponse.querySelector('.response-content').innerHTML = markdownToHTML(text);
        aiResponse.classList.remove('hidden')

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