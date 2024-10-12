const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser');



//db{

const db = new sqlite3.Database("./../../users data/users-data.db" ,(err)=>{
    if(err){
        console.error(err.message);
    }
})

//}



app.use(express.static(path.join(__dirname , "../../")));
app.use(bodyParser.json());

// db.run(`DELETE FROM users`)



//signup page{

app.post("/api-add-new-user" , (req , res)=>{
    info = req.body
    if(info.password.length < 6){
        console.log(23232)
        res.status(402).send()
    }
    else if(info.password == info.passwordConfirmation){

        db.get(`SELECT EXISTS (
            SELECT 1
            FROM users
            WHERE email = ? 
        ) AS email_exists`, [info.email], (err, row) => {
            if (err) {
                console.error(err.message);
            } else {
                if(row.email_exists){
                    res.status(401).send()
                }
                else if(!row.email_exists){
                    db.run(`INSERT INTO users(email,password) VALUES(?,?)` , [info.email , info.password] , (err)=>{
                        console.error(err)
                    })
                    res.status(200).send()
                }
            }
        });
    }
    else if(info.password != info.passwordConfirmation){
        res.status(400).send()
    }
}
)

//}



//routes{

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

//}