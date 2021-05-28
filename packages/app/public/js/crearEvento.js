document.getElementById("form").addEventListener("submit", (e)=>{
    e.preventDefault();

    let url = window.location.href
    let separador = url.split('/');
    let actual = separador[separador.length - 2];
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    let categoria = document.getElementById("palabras").value;
    let nombreEvento = document.getElementById("nombreEvento").value;
    let fecha = document.getElementById("fecha").value;
    let direccion = document.getElementById("direccion").value;
    let descripcion = document.getElementById("descripcion").value;
    let imagen = document.getElementById("image").files[0];
    if (actual =='modify') {
        if (imagen == "") {
            imagen = document.getElementById("img").dataset.path;
        }
    }

    // console.log(categoria + "\n" + nombreEvento + "\n" + fecha + "\n" + direccion + "\n" + descripcion + "\n" + imagen);
    // let user = sessionStorage.getItem('user')
    // user = JSON.parse(user).data
    let formdata = new FormData();
        formdata.append("title", nombreEvento);
        formdata.append("direction", direccion);
        formdata.append("description", descripcion);
        formdata.append("date", fecha);
        formdata.append("categorie", categoria);
        formdata.append("userId", idUser);
        formdata.append("image", imagen);

    let method = 'POST';
    let message = 'Actividad creada';

    if (actual=='modify') {
        method = 'PUT';
        message = 'Actividad modificada';
        let id_actividad = separador[separador.length - 1];
        formdata.append("id", id_actividad);
        formdata.append("title", nombreEvento);
        formdata.append("direction", direccion);
        formdata.append("description", descripcion);
        formdata.append("date", fecha);
        formdata.append("categorie", categoria);
        formdata.append("userId", idUser);
        formdata.append("image", imagen);
    }

    let requestOptions = {
        method: method,
        body: formdata,
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/activities`, requestOptions)
    .then((response) => {
        if (response.ok) {
            return response.text();
        } else if (response.status == 401) {
            throw new Error("No se encontó actividad");
        } else if (response.status == 404) {
            throw new Error("Ruta no encontrada");
        } else {
            throw new Error("Error Interno");
        }
    })
    .then((result) => {
        // console.log(result)
        const confirm = Swal.mixin({
            didClose: (toast) => {
                window.location.href = "http://localhost:5000/dashboard/psychology"
            }
        })
        confirm.fire(
            'Genial',
            `${message}`,
            'success',
        )
    })
    .catch((error) => {
        console.log(error)
        const confirm = Swal.mixin({
            didClose: (toast) => { }
        })
        confirm.fire(
            'Error',
            `${error}`,
            'error',
        )
    });
});
window.addEventListener('load', (e)=>{
    let url = window.location.href
    let separador = url.split('/');
    let actual = separador[separador.length-2];
    if (actual=="modify") {
        let id_actividad = separador[separador.length-1];
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        document.querySelector("h4").innerText = "Modificar un evento";
        document.querySelector("input.botons").value = "Actualizar";
        document.querySelector("input[type='radio']").parentNode.remove()
        document.title = "Modificar Evento|Health Space";
        fetch(`http://localhost:3000/obtenerActividad/${id_actividad}`, requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else if (response.status == 401) {
                    throw new Error("Acceso no autorizado");
                } else if (response.status == 404) {
                    throw new Error("Página no encontrada");
                } else {
                    throw new Error("Error Interno");
                }
            })
            .then(result => {
                let data = JSON.parse(result).data[0];
                if (typeof data == "undefined") {
                    const success = Swal.mixin({
                        didClose: (toast) => {
                            window.history.back();
                        }
                    })
                    success.fire(
                        '¡Error!',
                        '¡No se encontró la actividad!',
                        'error',
                    )
                }
                // console.log(data)
                document.getElementById("img").src = `${data.image}`;
                document.getElementById("img").dataset.path = data.image;
                document.getElementById("palabras").value = data.categorie;
                document.getElementById("nombreEvento").value = data.title;
                document.getElementById("fecha").value = data.date.substr(0, 16);
                document.getElementById("direccion").value = data.direction;
                document.getElementById("descripcion").value = data.description;
            })
            .catch(error => {
                console.log(error)
                const confirm = Swal.mixin({
                    didClose: (toast) => {
                        window.history.back();
                    }
                })
                confirm.fire(
                    'Error',
                    `${error}`,
                    'error',
                )
            });
    } else {
        document.querySelector("#img").parentNode.remove();
    }
});