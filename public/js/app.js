

console.log('Java Script no frontend')
const mainMensage = document.querySelector('h3')
const cotacoesForm = document.querySelector('form')
const price = document.querySelector('#open')
const close = document.querySelector('#close')
const ativo = document.querySelector('#ativo')
cotacoesForm.addEventListener('submit', (event) => {
    mainMensage.innerText = 'buscando...'
    event.preventDefault()
    const ativo = document.querySelector('input').value
    if(!ativo) {
        mainMensage.innerText = 'O ativo deve ser informado'
        return  
    }
    fetch(`http://localhost:3000/Cotacoes?ativo=${ativo}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(`alguma coisa deu errado ${data.error.message} código ${data.error.code}`)
            
        }else { 
            mainMensage.innerText = `Ativo: ${data.symbol}`
            price.innerHTML =  `Abertura: ${data.open}`
            close.innerHTML = `Fechamento: ${data.close}`
            // price.innerHTML = data.close
            
            
        }
     
    })
})
})