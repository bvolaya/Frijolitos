const express = require("express");
const app = express();
const port = 5000;

// Setting up the public directory
app.use('/css',express.static(__dirname +'/public/css'));
app.use('/js',express.static(__dirname +'/public/js'));
app.use('/img',express.static(__dirname +'/public/img'));
app.use('/font',express.static(__dirname +'/public/font'));
app.get('/', (request,response)=>{
    response.sendFile(__dirname +'/public/html/index.html')
})

app.get('/event', (request,response)=>{
    response.sendFile(__dirname +'/public/html/tableroDeEventos.html')
})

app.listen(port, () => console.log(`listening on port ${port}!`));
