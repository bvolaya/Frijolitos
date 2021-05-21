if (document.addEventListener){
    window.addEventListener('load',obtenerActividad(),false);

} else {
    window.attachEvent('onload',obtenerActividad());
}

function obtenerActividad () {
    console.log("obteniendo actividades");
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    ///////////////REVISAR LOCALHOST////////////////////
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    fetch(`http://localhost:3000/activities/${idUser}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            insertActivities(data)
        })
        .catch(error => console.log('error', error));
}

//Modificar Actividades
var getData = function () {
    var palabras = document.getElementById("palabras").value;
    var nombreEvento = document.getElementById("nombreEvento").value;
    var fecha = document.getElementById("fecha").value;
    var direccion = document.getElementById("direccion").value;
    var descripcion = document.getElementById("descripcion").value;

function getData() {
    let categoria = document.getElementById("palabras").value;
    let nombreEvento = document.getElementById("nombreEvento").value;
    let fecha = document.getElementById("fecha").value;
    let direccion = document.getElementById("direccion").value;
    let descripcion = document.getElementById("descripcion").value;


    if (palabras == "") {
        document.getElementById("palabras").focus();
    } else {

        if (nombreEvento == "") {
            document.getElementById("nombreEvento").focus();
        } else {
            if (fecha == "") {
                document.getElementById("fecha").focus();
            } else {
                if (direccion == "") {
                    document.getElementById("direccion").focus();
                } else {
                    if (descripcion == "") {
                        document.getElementById("descripcion").focus();
                    } else{
                        console.log(palabras + " " + nombreEvento + " " + fecha + " " + direccion + " " + descripcion);
                    }
                }
            }
        }
    }
    try {
        let user = sessionStorage.getItem('user')
        user = JSON.parse(user).data
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
          id:localStorage.getItem("idActividad"),
          title: nombreEvento,
          direction: direccion,
          description: descripcion,
          date: fecha,
          categorie: categoria,
          userId: user.id
        });

        let requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
        };

        fetch("http://localhost:5000/activitiesMod", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            alert("Actividad modificada")
            window.location.href =
              "http://localhost:5000/html/tableroDeEventosPsicologo.html";
        })
        .catch((error) => {
            console.log("error", error);
            alert("Error no se pudo modificar el evento");
        }); 
        
    } catch (error) {
        alert("Tienes que loguearte");
        window.location.href =
          "http://localhost:5000/html/login.html";
        }
    }
    
}
function getActivity(Id){
    
    fetch(`http://localhost:5000/obtenerActividad/${id}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            console.log(data)

            if (data.length > 0){
                document.getElementById("palabras").value=data.categorie;
                document.getElementById("nombreEvento").value=data.title;
                document.getElementById("fecha").value=data.date;
                document.getElementById("direccion").value=data.direction;
                document.getElementById("descripcion").value=data.description;
            }
        })
        .catch(error => console.log('error', error));
}

window.onload=function(){
    id=localStorage.getItem("idActividad")
    getActivity(id)
    
}
///////////////////////////////////////////////
//Insertar tablero de actividades
function insertActivities(data) {
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
            let img = document.createElement("img");
            img.src = data[index].image
            img.width = "200"
            let h4 = document.createElement("h4");
            h4.textContent = data[index].direction
            let h5 = document.createElement("h5");
            h5.textContent = data[index].date
            let p = document.createElement("p");
            p.textContent = data[index].description
            let button1 = document.createElement("button");
            button1.className = "btn status"
            button1.textContent = "Modificar"
            button1.onclick =  function() {suscribe(event)}
            let button2 = document.createElement("button");
            button2.className = "btn-r status"
            button2.textContent = "Eliminar"
            button2.onclick =  function() {suscribe(event)}

            div3.appendChild(h3)
            div3.appendChild(img)
            div3.appendChild(h4)
            div3.appendChild(h5)
            div3.appendChild(p)
            div3.appendChild(button1)
            div3.appendChild(button2)
            div2.appendChild(div3)
            div1.appendChild(div2)
            divFather.appendChild(div1);
            div.appendChild(divFather);
        }
    }else{
        let p = document.createElement("p");
        p.textContent = "No encontramos actividades para mostrarte 🤦‍♂️"
        p.className = "subcards"
        divFather.appendChild(p);
        div.appendChild(divFather);
    }
}
