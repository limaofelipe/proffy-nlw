
//Server
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')
const {pageLanding, pageStudy, pageGiveClasses} = require("./pages")
// Consfigura arquivos estáticos CSS e Js
//server.use(express.static("public"))



// configurações do nunjucks (De Js a HTML)
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

server
// Consfigura arquivos estáticos CSS e Js
.use(express.static("public"))
// Mostrar
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)

// Porta
.listen(5500)