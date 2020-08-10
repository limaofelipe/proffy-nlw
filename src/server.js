const proffys = [
    {name: "Diego Fernandes", 
    avatar: "https://avatars0.githubusercontent.com/u/46505446?s=400&u=cdfc5f2d99a9ee330f3c70455586e5a3a10b3fae&v=4", 
    whatsapp: "(11)988888888", 
    bio: "Entusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "Química", 
    cost: "R$20,00", 
    weekday: [
        0
    ], 
    time_from: [720], 
    time_to: [1220]
    
    },
    {name: "Danielle Evangelista", 
    avatar: "https://avatars0.githubusercontent.com/u/46505446?s=400&u=cdfc5f2d99a9ee330f3c70455586e5a3a10b3fae&v=4", 
    whatsapp: "(11)987777777", 
    bio: "Entusiasta das melhores tecnologias de química avançada. <br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject: "História", 
    cost: "R$40,00", 
    weekday: [2], 
    time_from: [720], 
    time_to: [1220]
    }
]

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

// Consfigura arquivos estáticos CSS e Js
server.use(express.static("public"))

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]
function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber -1
    return subjects[arrayPosition]
}
// Pegar o HTML
function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query
    
    const isNotEmpty = Object.keys(data).length > 0
    if (isNotEmpty) {
        data.subject = getSubject(data.subject)
        
        // ADDICIONAR DADOS À LISTA DE PROFFYS
        proffys.push(data)
        
        return res.redirect("/study")
    }
    
    
    return res.render("give-classes.html", {weekdays, subjects})
}

// configurações do nunjucks (De Js a HTML)
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

// Consfigura arquivos estáticos CSS e Js
server.use(express.static("public"))


// Mostrar
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

// Porta
.listen(5500)