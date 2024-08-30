const express=require("express")
const serverConfig=require('./configs/server.configs')
const dbConfig=require('./configs/db.configs')
const mongoose=require("mongoose")
const app=express()

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