function aleta(){
    Swal.mixin({
        //input: 'text', //puede ser text, number, email, password, textarea, select, radio
        confirmButtonText: 'Siguiente',
        showCancelButton: true,
        progressSteps: ['1', '2', '3','4','5','6','7']
    }).queue([
        {
            imageUrl: '../img/teatro.jpg',
        title: 'Teatro',
        },
        {
        title: 'Descripción',
        text: 'Vamos comunicarno por medio de la actuacion.'
        },
        {
        title: 'Autor de la actividad.',
        text: 'Brenda Benitez'
        },
        {
            title: 'Lugar.',
            text:'Suba'
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

    // Swal.fire({
    //     imageUrl: '../img/teatro.jpg',
    //     title: 'Teatro',
    //     text: 'Vamos al intereactuar y hacer actuacion',
    //     text: 'Brenda Venites',
    //     text: 'Centro',
    //     text: 'Comunicacion',
    //     text: '3:00p.m.',
    //     text: 'cantidad de participantes: 8',
    //     padding: '1rem',
    //     timer: 20000,
    //     imageWidth: 350,
    //     imageHeight: 200,
    //     imageAlt: 'A tall image',
    //     confirmButtonText: 'Yes, delete it!'
    // });
};
// $("#btn3").click(function(){
//     Swal.fire({
//         imageUrl: 'img/html5.png',
//         imageHeight: 412,
//         imageAlt: 'A tall image'
//     });
// });