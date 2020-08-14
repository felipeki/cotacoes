const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const cotacoes = require('./util/cotacao')
const publicDirectoryPath = path.join(__dirname, '../public') // Define o diretorio raiz da aplicacao e webserver
const viewsPath = path.join(__dirname, '../templates/views')
app.use(express.static(publicDirectoryPath)) // definie o camnho do Public
const partialsPaths = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPaths)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Bem vindo ao sistema de cotações',
        author: 'Biharck',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Sobre',
        author: 'Biharck Araújo',
    
})
})
// rotas da aplicacao
// minhaap.com.br 
// minhaap.com.br/help
// minhaap.com.br/about

// app.get('', (req, res) =>
// {
//     res.send('<h1>Hello minhas app</h1>')
// })


//definir uma rota para cotacoes 


app.get('/cotacoes', (req, res) =>{
    const error = {
        message: 'O ativo deve ser informado como query parameter',
        code: 400
    }
if(!req.query.ativo) {
    return res.status(400).json({
        error: {
            message: 'O ativo deve ser informado como query parameter',
           // code: err.code
        }
    })

}
const symbol = req.query.ativo.toUpperCase()
cotacoes(symbol, (data, err) =>{
    if(err) {
        console.log(err)
       return res.send(err)
    }
    console.log(data)
    res.send(data)
    })

 
})

app.get('/help/*', (req, res) =>{cd 
    // res.send('404')
    const errorMessage = ''
    res.render('404', {
        title : '404',
        errorMessage : 'Não existe pagina depois de /help',
        author: 'Biharck Araújo'
    })
})


app.get('*', (req, res) =>{
    // res.send('404')
    
    res.render('404', {
        title : '404',
        errorMessage : 'Pagina não encontrada',
        author: 'Biharck Araújo'
    })
})

app.get('/about', (req, res) =>{
    res.send('About Page', {
      title: 'Sobre',
      author: 'Biharck Araújo'  
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
      title: 'Ajuda',
     
    })
})

const port  = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`server is up on port ${port} `)
})
