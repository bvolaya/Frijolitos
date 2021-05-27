window.addEventListener("load", ()=>{
    let url = window.location.href.split('/');
    let id = url[url.length-1]

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(`http://localhost:3000/activityDetails/${id}`, requestOptions)
        .then((response) => {
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
        .then((result) => {
            let res = JSON.parse(result);
            // console.log(res);
            if (!res.data.activity.length) {
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
            } else {
                let actividad = res.data.activity[0];
                let fecha = FormatDate(actividad.date);
                let participantes = res.data.participants;
                let actualUserId = JSON.parse(sessionStorage.getItem('user')).data.id;
                let actualUserRol = JSON.parse(sessionStorage.getItem('user')).data.rol;
                let strParticipantes = "";
                let userIsParticipant = false;
                if (participantes.length) {
                    participantes.forEach(elem => {
                        let nombreParticipante = `${elem.firstName} ${elem.lastName}`;
                        if (elem.id == actualUserId) {
                            nombreParticipante = 'Tú';
                            userIsParticipant = true;
                        }
                        strParticipantes += `
                            <div class='img_participante'>
                                <img src="../img/${elem.img}" alt="Foto del participante" class="circle">
                                <label>${nombreParticipante}</label>
                            </div>
                        `;
                    });
                } else {
                    if (actualUserRol=='participant') {
                        strParticipantes = `
                            <div class='img_participante'>
                                <label>No hay participantes, <b>¡se el primero en unirte!</b></label>
                            </div>
                        `;
                    } else {
                        strParticipantes = `
                            <div class='img_participante'>
                                <label>No hay participantes</label>
                            </div>
                        `;
                    }
                }

                let btnUnirmeSalirme = "";
                if (actualUserRol=='participant') {
                    if (!userIsParticipant) {
                        btnUnirmeSalirme = `
                            <div style='clear: left;'>
                                <button class='btn status' onclick='suscribe(event);'>¡UNIRME!</button>
                            </div>
                        `;
                    } else {
                        btnUnirmeSalirme = `
                            <div style='clear: left;'>
                                <button class='btn-r status' onclick='eliminarActividad(${id});'>¡SALIRME!</button>
                            </div>
                        `;
                    }
                }

                let detalle = `
                            <h2 style="width: 100%; background-color: var(--primario); color: var(--blanco);">${actividad.title}</h2>
                            <div style="padding-left: 10%; padding-right: 10%;">
                                <img src="../img/${actividad.image}" alt="Imagen de actividad" width="100%" style="max-height: 500px;">
                            </div>
                            <div style='margin-top: 1rem; padding-left: 10%; font-size: 20px;'>
                                <div style="float: left;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.848 12.459c.202.038.202.333.001.372-1.907.361-6.045 1.111-6.547 1.111-.719 0-1.301-.582-1.301-1.301 0-.512.77-5.447 1.125-7.445.034-.192.312-.181.343.014l.985 6.238 5.394 1.011z"/></svg>
                                </div>
                                <div style="float: left; padding-top: 5px; padding-left: 5px;">
                                    ${fecha}
                                </div>
                            </div>
                            <div style='padding-left: 10%; clear: left; font-size: 20px;'>
                                <div style="float: left;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661 0-2.984 2.804-5.602 6-5.602m0-2c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
                                </div>
                                <div style="float: left; padding-top: 5px; padding-left: 5px;">
                                    ${actividad.direction}
                                </div>
                            </div>
                            ${btnUnirmeSalirme}
                            <p style="text-align: justify; padding-left: 10%; padding-right: 10%; clear: left; margin-top: 3rem;"><b style='font-size: 18px;'>Descripción:</b> ${actividad.description}</p>
                            <h3>Participantes</h3>
                            <div class="div_duo">${strParticipantes}</div>
                `;

                let recomendaciones = res.data.recomended;
                let strRecomendaciones = "";
                if (recomendaciones.length) {
                    recomendaciones.forEach(elem => {
                        strRecomendaciones += `
                            <div class="card" onclick="window.location.href='/detail/${elem.id}'">
                                <h3 style="width: 100%; background-color: var(--primario); color: var(--blanco);">${elem.title}</h3>
                                <img src="../img/${elem.image}" alt="Imagen de la actividad" width="100%" style="max-height: 300px;">
                            </div>
                        `;
                    });
                }

                document.getElementById("content_activity").innerHTML = detalle;
                document.getElementById("act_recomentadas").innerHTML = strRecomendaciones;
            }
        })
        .catch((error) => {
            console.log("error", error);
        });
});

function suscribe(event) {
    let url = window.location.href.split('/');
    let id = url[url.length - 1]
    let idUser
    if (sessionStorage.getItem('user')){
        idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    }else {throw new Error("User no Login")}

    let Header = new Headers();
    Header.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "userId": idUser,
        "activityId": parseInt(id)
    });

    const requestOptions = {
        method: 'POST',
        headers: Header,
        body: raw,
        redirect: 'follow'
    };
    
    fetch("http://localhost:3000/suscribe", requestOptions)
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
            console.log(result);
            const confirm = Swal.mixin({
                didClose: (toast) => {
                    location.reload()
                }
            })
            confirm.fire(
                'Genial',
                'Te has Unido a la actividad',
                'success',
            )
            // location.reload()
        })
        .catch(error => {
            console.log("error", error);
            Swal.fire(
                '¡Error!',
                '¡Error al unirse a la actividad!',
                'error',
            )
        });
}

function eliminarActividad(_this) {

    Swal.fire({
        title: '¿Está seguro de eliminar la suscripción a la actividad?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            let url = window.location.href.split('/');
            let id = url[url.length - 1]
            let data = JSON.stringify({
                challengeId: parseInt(id),
                userId: JSON.parse(sessionStorage.getItem('user')).data.id
            });
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: data,
                redirect: "follow",
            };

            fetch("http://localhost:3000/eliminarActividadUser", requestOptions)
                .then((response) => {
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
                .then((result) => {
                    console.log(result);
                    const success = Swal.mixin({
                        didClose: (toast) => {
                            window.location.reload()
                        }
                    })
                    success.fire(
                        '¡Eliminado!',
                        '¡Actividad eliminada!',
                        'success',
                    )

                })
                .catch((error) => {
                    console.log("error", error);
                    Swal.fire(
                        '¡Error!',
                        '¡No se pudo eliminar el evento!',
                        'error',
                    )
                });
        }
    })
}

function FormatDate(fecha) {
    let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let date = new Date(fecha)
    let dayNumber = date.getDay();
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = addZero(date.getDate());
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let str = `${dias[dayNumber]}, ${day} de ${meses[month]} de ${year}, ${addZero(hour)}:${addZero(minutes)}`;
    return str;
}

function addZero(str) {
    let newstr = new String(str)
    if (newstr.length==1) {
        return '0'+str;
    }
    return str;
}