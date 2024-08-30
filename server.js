const express=require("express")
const serverConfig=require('./configs/server.configs')
const dbConfig=require('./configs/db.configs')
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const app=express()

// in-built middlewares
app.use(bodyParser.json())// it is used to convert json obj into js object because node understands js objects not json
app.use(bodyParser.urlencoded({extended:true}))// it is done so that if url contains any special character then also url should work

// plugging the routes to app(server.js) 
require("./routes/user.routes")(app)
// connect to db
mongoose.connect(dbConfig.DB_Url)
const db=mongoose.connection;

db.on('error',()=>{
    console.log('error while connecting to db')
})
db.once('open',()=>{
    console.log('connected to database')
})


// connect to server
app.listen(serverConfig.PORT,()=>{
    console.log('server started on Port:',serverConfig.PORT)
})