function obtenerActividad (event) {
    console.log("");
    let id = event.path[3].getAttribute('id')
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    fetch(`http://localhost:3000/activities/${idUser}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            data=data.filter(item=>item.id=id);
            aleta(data)
        })
        .catch(error => console.log('error', error));
}
function suscribe(event) {
    let idActivities = event.path[3].getAttribute('id')
}

function aleta(data){
    Swal.mixin({
        input: 'text', //puede ser text, number, email, password, textarea, select, radio
        confirmButtonText: 'Siguiente',
        showCancelButton: true,
        progressSteps: ['1', '2', '3','4','5','6','7']
    }).queue([
        {
        imageUrl: data[0].image,
        title: data[0].title,
        imageWidth: 350,
        imageHeight: 200,
        },
        {
        title: 'Descripción',
        text: data[0].description,
        },
        {
        title: 'Autor de la actividad.',
        text: 'Brenda Benitez',
        },
        {
            title: 'Lugar.',
            text:'a'
        },
        {
            title:'Hora del evento.',
            text:'3:00p.m.'
        },
        {
            title:'Cantidad e participantes.',
            text:'9'
        },
        {
            title:'Categoria del evento.',
            text:'Comunicacion',
        },
    ]).then((result) => {
        if (result.value) {
        Swal.fire({
            title: '¡¡Completado!!',
            html:
            'Animate, Te estamos esperando.' +
               // JSON.stringify() +
            '',
            confirmButtonText: 'Ok'
        })
        }
    });

//     Swal.fire({
//         imageUrl: '../img/teatro.jpg',
//         title: 'Teatro',
//         text: 'Vamos al intereactuar y hacer actuacion '+'holas',
//         padding: '1rem',
//         timer: 1000,
//         imageWidth: 350,
//         imageHeight: 200,
//         imageAlt: 'A tall image',
//         confirmButtonText: 'Yes, delete it!'
//     })
};
// $("#btn3").click(function(){
//     Swal.fire({
//         imageUrl: 'img/html5.png',
//         imageHeight: 412,
//         imageAlt: 'A tall image'
//     });
// });