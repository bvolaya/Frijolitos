const express = require("express");
const app = express();
const port = 5000;

// Setting up the public directory
app.use('/css',express.static(__dirname +'/public/css'));
app.use('/js',express.static(__dirname +'/public/js'));
app.use('/img',express.static(__dirname +'/public/img'));
app.use('/font',express.static(__dirname +'/public/font'));
app.use('/lib',express.static(__dirname +'/public/lib'));

// Rutas de Inicio
app.get('/', (request,response)=>{
    response.sendFile(__dirname +'/public/html/index.html')
})
app.get('/contact', (request,response)=>{
    response.sendFile(__dirname +'/public/html/contacto.html')
})
app.get('/activities', (request,response)=>{
    response.sendFile(__dirname +'/public/html/actividades.html')
})
app.get('/gallery', (request,response)=>{
    response.sendFile(__dirname +'/public/html/gallery.html')
})

// Rutas de login
app.get('/login', (request,response)=>{
    response.sendFile(__dirname +'/public/html/login.html')
})
// Rutas de registro
app.get('/register', (request,response)=>{
    response.sendFile(__dirname +'/public/html/registroCrador.html')
})

app.get('/register/psychology', (request,response)=>{
    response.sendFile(__dirname +'/public/html/registroPsicologo.html')
})

// Rutas de eventos
app.get('/events', (request,response)=>{
    response.sendFile(__dirname +'/public/html/EventosParticipante.html')
})

app.get('/event/create', (request,response)=>{
    response.sendFile(__dirname +'/public/html/crearEventos.html')
})

app.get('/event/modify/:id', (request, response) => {
    response.sendFile(__dirname + '/public/html/crearEventos.html')
})
// Rutas de perfiles
app.get('/profile', (request,response)=>{
    response.sendFile(__dirname +'/public/html/PerfilParticipante.html')
})
app.get('/profile/psychology', (request,response)=>{
    response.sendFile(__dirname +'/public/html/perfilPsicologo.html')
})

// Rutas de dashboard
app.get('/dashboard', (request,response)=>{
    response.sendFile(__dirname +'/public/html/dashParticipante.html')
})

app.get('/dashboard/psychology', (request,response)=>{
    response.sendFile(__dirname +'/public/html/dashPsicologo.html')
})

// Ruta de detalle actividad
app.get('/detail/:id', (request, response, next) => {
    response.sendFile(__dirname + '/public/html/detalleActividad.html')
    // console.log(request.params.id);
})

app.listen(port, () => console.log(`listening on port ${port}!`));
