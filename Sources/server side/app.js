const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let sql;

const db = new sqlite3.Database('./../../users data/users-data.db' , (err)=>{
    if(err) console.error(err.message);
})

sql = "";


app.use(express.static(path.join(__dirname , "../../")));

app.get('/', (req , res)=>{
    res.sendFile("index.html");
})

app.get("/signup" , (req , res)=>{
    res.sendFile(path.join(__dirname , "../../pages/signup.html"))
})

app.get("/signin" , (req , res)=>{
    res.sendFile(path.join(__dirname , "../../pages/signin.html"))
})


app.listen(8000 , ()=>{
    console.log('app running on port 8000')
})

