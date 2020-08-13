const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //inserir dados
    proffyValue = {
        name: "Felipe Lima", 
        avatar: "https://avatars0.githubusercontent.com/u/46505446?s=400&u=cdfc5f2d99a9ee330f3c70455586e5a3a10b3fae&v=4", 
        whatsapp: "(11)988888888", 
        bio: "O melhor de todos. Entusiasta das melhores tecnologias de química avançada. Apaixonado pela iana! coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    }

    classValue = {
        subject: "Arte de ser fofo", 
        cost: "R$100,00", 
        //proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados após o cadastro da aula
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },

        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})


    //Consultar dados inseridos
    //Todos os proffys
    const selectedProffys = await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    //consultar as classes de  um determinado profyy
    //e trazer juntos os dados do proffy
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id);
        WHERE classes.proffy_id = 1;    
    `)
    console.log(selectClassesAndProffys)
    //o horário que a pessoa trabalha por exemplo é das 8h - 18h
    //entao o hotrario do time_from (8h) precisa ser antes ou igual ao horario solicitado
    //o time_to precisa ser acima

    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"  
    `)

    //console.log(selectClassesSchedules)
})
