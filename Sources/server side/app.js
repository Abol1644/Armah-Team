const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
//db{

const db = new sqlite3.Database("./../../users data/users-data.db" ,(err)=>{
    if(err){
        console.error(err.message);
    }
})

//}
app.post('user-status' , (req, res, next) => {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    if (!token) {
        res.locals.userLoggedIn = 0;
        return;
    }

    try {
        const decoded = jwt.verify(token, 'd82a43eb1d837f45e9e9a5c3fa213ba8c6728d68a6cd09a7f743cfa7a82a1f8cd44f00aa739b67c132f99039c07e9c69');
        req.user = decoded;
        res.locals.userLoggedIn = 1;
    } catch (err) {
        res.locals.userLoggedIn = 0;
    }
    // return res.status(200).
    console.log(locals.userLoggedIn)
})

app.use(express.static(path.join(__dirname , "../../")));
app.use(cookieParser())

// db.run(`DELETE FROM users`)

app.use(session({
    secret: 'd82a43eb1d837f45e9e9a5c3fa213ba8c6728d68a6cd09a7f743cfa7a82a1f8cd44f00aa739b67c132f99039c07e9c69',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));





//signup page{

app.post("/api-add-new-user" , (req , res)=>{
    info = req.body
    console.log(info.password + `   ${info.email}`)
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



// db.run(`
// ALTER TABLE users
// ADD COLUMN a_token CHAR(602)`)


//signinpage{
    app.post('/signin-API', (req, res) => {
        const { email, password , rememberMe } = req.body;  
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
                    const id = db.run(`SELECT id FROM users WHERE email = ?` , [email])
                    const token = jwt.sign({ id:id, email:email }, 'd82a43eb1d837f45e9e9a5c3fa213ba8c6728d68a6cd09a7f743cfa7a82a1f8cd44f00aa739b67c132f99039c07e9c69', { expiresIn: rememberMe ? '7d' : '1d' })
                    res.cookie('token', token, {
                        httpOnly: true,
                        secure: false,
                        maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000
                    });
                    return res.status(200).json({ message: 'Successfully signed in!' });
                } else {
                    return res.status(401).json({ error: 'Invalid password' });
                }
        
            });
        });
    });
    
    const authenticateUser = (req, res, next) => {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    
        try {
            const decoded = jwt.verify(token, 'd82a43eb1d837f45e9e9a5c3fa213ba8c6728d68a6cd09a7f743cfa7a82a1f8cd44f00aa739b67c132f99039c07e9c69');
            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };

    //}

//routes{

app.get('/',(req ,res ) => res.sendFile('index.html'));

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