express = require('express');
path = require('path');
app = express();

app.use(express.static(path.join(__dirname , "../../")));

app.get('/', (req , res)=>{
    res.sendFile("index.html");
})

app.listen(8000 , ()=>{
    console.log('app running on port 8000')
})