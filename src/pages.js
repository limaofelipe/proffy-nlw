const database = require('./database/db')
const { subjects, weekdays, getSubject, convertHoursToMinutes }= require('./utils/format')
// Pegar o HTML
function pageLanding(req, res){
    return res.render("index.html")
}

async function  pageStudy(req, res){
    const filters = req.query
    
    if(!filters.subject  || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }
    
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)
   
    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
        )
    AND classes.subject = "${getSubject(filters.subject)}"
        `
     
        // Caso haja erro na hora da consulta do banco de dados
        try {
            const db = await database
            const proffys = await db.all(query)
            return res.render('study.html' , {proffys, subjects, filters, weekdays})
        } catch (error) {   
         
        }

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

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses
}