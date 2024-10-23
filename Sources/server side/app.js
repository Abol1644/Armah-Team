const express = require('express');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');


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

                    const saltRounds = 10;
                    const plainPassword = info.password;
                    
                    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
                        if (err) {
                            console.error('Error hashing password:', err);
                            return;
                        }
            
                        console.log('Hashed password:', hash);
                        db.run(`INSERT INTO users(email,password) VALUES(?,?)` , [info.email , hash] , (err)=>{
                            console.error(err)
                        })
                        res.status(200).send()
                    });                    
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

//signinpage{
    app.post('/signin-API', (req, res) => {
        const { email, password } = req.body;  
        const Query = `SELECT password FROM users WHERE email = ?`;
    
        db.get(Query, [email], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }
            if (!row) {
                return res.status(401).json({ error: 'Email not found' });
            }
    
            const storedHashedPassword = row.password;
    
      
            console.log('Provided password:', password);
            console.log('Stored hashed password:', storedHashedPassword);
    
        
            if (!password || !storedHashedPassword) {
                return res.status(400).json({ error: 'Password is missing or invalid' });
            }
    
    
            bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ error: 'Error comparing passwords' });
                }
    
            
                console.log('isMatch value:', isMatch);
    
                if (isMatch) {
                    return res.status(200).json({ message: 'Successfully signed in!' });
                } else {
                    return res.status(401).json({ error: 'Invalid password' });
                }
            });
        });
    });
    

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