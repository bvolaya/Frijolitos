let user = JSON.parse(sessionStorage.getItem('user')).data
if (document.addEventListener){
    window.addEventListener('load',insertUser(user),false);
    window.addEventListener('load',insertAgenda(),false);

} else {
    window.attachEvent('onload',insertUser(user));
    window.attachEvent('onload',insertAgenda());
}
function insertUser(data) {
    let div = document.getElementById("perfil")
    let divFather = document.createElement("div")
        divFather.className = "row padre";
    if (data){
            let div1 = document.createElement("div")
            div1.className = "col-12 my-13 pt-3 shadow"
            let img = document.createElement("img");
            img.src = data.profile.img
            img.width = '400'
            img.className = "float-left rounded-circle mr-2"
            let h1 = document.createElement("h1");
            h1.textContent = data.firstName+' '+data.lastName
            let h3 = document.createElement("h3");
            h3.textContent = data.mail
            div1.appendChild(img)
            
            div1.appendChild(document.createElement("br"))
            div1.appendChild(h1)
            div1.appendChild(document.createElement("br"))
            div1.appendChild(document.createElement("br"))
            div1.appendChild(document.createElement("br"))
            div1.appendChild(h3)
            div1.prepend(document.createElement("br"))
            div1.prepend(document.createElement("br"))
            div1.prepend(document.createElement("br"))
            divFather.appendChild(div1)
            div.prepend(divFather)
    }
}

function insertAgenda() {
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(`http://localhost:3000/activities/${idUser}/profile`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            if (data.length > 0){
                for (let index = 0; index < data.length; index++) {
                    insertActivitiesToDom(data)
                }
            }
        })
        .catch(error => console.log('error', error));
    
}


function insertActivitiesToDom(data) {
    deleteAllActivities('.cards','.subcards')
    const div = document.querySelector(".main")
    let divFather = document.createElement("div")
    divFather.className = "cardbox cards";
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let div1 = document.createElement("div");
            div1.className = "card sombra subcards"
            div1.id = data[index].id
            let div2 = document.createElement("div");
            div2.className = "actividadParticipante"
            let div3 = document.createElement("div");
            let h3 = document.createElement("h3");
            h3.textContent = data[index].title
            let div4 = document.createElement("div");
            div4.className = "image"
            div4.width = "100%"
            div4.style.textAlign = "center"
            let img = document.createElement("img");
            img.src = data[index].image
            img.width = "200"
            let h4 = document.createElement("h4");
            h4.textContent = data[index].direction
            let h5 = document.createElement("h5");
            h5.textContent = FormatDate(data[index].date)
            let p = document.createElement("p");
            p.textContent = data[index].description
            let div5 = document.createElement("div");
            div5.style.width = "100%";
            div5.style.textAlign = "center";
            let button = document.createElement("button");
            button.className = "btn"
            button.textContent = "Eliminar"
            button.onclick =  function() {eliminarActividad(this)}
            
            div5.appendChild(button)
            div3.appendChild(h3)
            div4.appendChild(img)
            div3.appendChild(div4)
            div3.appendChild(h4)
            div3.appendChild(h5)
            div3.appendChild(p)
            div3.appendChild(div5)
            div2.appendChild(div3)
            div1.appendChild(div2)
            divFather.appendChild(div1);
            div.appendChild(divFather);
        }
    }else{
        let p = document.createElement("p");
        p.textContent = "Aun no te has suscripto a una actividad 🤦‍♂️"
        p.className = "subcards"
        divFather.appendChild(p);
        div.appendChild(divFather);
    }
}

function deleteAllActivities(classNodeFather,classNodeSon) {
    //Delete nodo to DOM
    let fatherNode = document.querySelector(classNodeFather)
    let sonNode = document.querySelector(classNodeSon)
    if (fatherNode && sonNode) fatherNode.removeChild(sonNode)
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
            let data = JSON.stringify({
                challengeId: _this.parentNode.parentNode.parentNode.id,
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
                        _this.parentNode.parentNode.parentNode.remove()
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