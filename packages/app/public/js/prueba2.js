// let actividades = [
//     {
//         id:1,
//         "title": "Escuela de Familias",
//         image: "../img/bici.jpg",
// 	    "direccion": "Cl. 63 #45-10",
// 	    "fecha": "16/05/2021",
//         "description": "ejemploDescripcion",
//     }
    // {
    //     id:2,
    //     "title": "Escuela de Familias",
    //     image: "../img/bici.jpg",
	//     "direccion": "Cl. 63 #45-10",
	//     "fecha": "16/05/2021",
    //     "description": "ejemploDescripcion",
    // },
    // {
    //     id:3,
    //     "title": "Escuela de Familias",
    //     image: "../img/bici.jpg",
	//     "direccion": "Cl. 63 #45-10",
	//     "fecha": "16/05/2021",
    //     "description": "ejemploDescripcion",
    // }
// ]



if (document.addEventListener){
    window.addEventListener('load',insertActivities(actividades),false);

} else {
    window.attachEvent('onload',insertActivities(actividades));
}

function obtenerActividad(){
    console.log("Obteniendo actividades");
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    let idUser = JSON.parse(sessionStorage.getItem('user')).data.id
    fetch(`http://localhost:5000/activities/${idUser}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            insertActivities(data)
        })
        .catch(error => console.log('error',error));
}


function Modificar(id) {
    localStorage.removeItem("idActividad")
    localStorage.setItem('idActividad', id);
    window.location.href =    "http://localhost:5000/modificarEvento.html";

}



function Eliminar(id) {

    if (confirm("¿Está seguro de eliminar la actividad?")) {
        let raw = JSON.stringify({
            'isActive': false,
            "id": id
        })
        
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
                alert("Actividad eliminada")
                window.location.href =
                    "http://localhost:5000/html/tableroDeEventosPsicologo.html";
            })
            .catch((error) => {
                console.log("error", error);
                alert("Error no se pudo modificar el evento");
            });

    }
}

function insertActivities(data) {
    const div = document.querySelector(".main")
    let divFather = document.createElement("div")
        divFather.className = "cardbox";
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let div1 = document.createElement("div");
            div1.className = "card sombra"
            div1.id = data[index].id
            let div2 = document.createElement("div");
            div2.className = "actividadParticipante"
            let div3 = document.createElement("div");
	        let h3 = document.createElement("h3");
            h3.textContent = data[index].title
            let img = document.createElement("img");
            img.src = data[index].image
	        let h4 = document.createElement("h4");
            h4.textContent = data[index].direccion
	        let h5 = document.createElement("h5");
            h5.textContent = data[index].fecha
            let p = document.createElement("p");
            p.textContent = data[index].description
            let button1 = document.createElement("button");
            button1.className = "btn"
            button1.textContent = "Modificar"
            button1.id = "btn_"+data[index].id
            button1.onclick =  function() {Modificar(data[index].id)}
            let button2 = document.createElement("button");
            button2.className = "btn-r"
            button2.textContent = "Eliminar"
            button2.id = "btn1_"+data[index].id
            button2.onclick =  function() {Eliminar(data[index].id)}

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
            divFather.appendChild(p);
            div.appendChild(divFather);
    }


}

function deleteAllActivities(classNodeFather, classNodeSon){
    let fatherNode = document.querySelector(classNodeFather)
    let sonNode = document.querySelector(classNodeSon)
    if (fatherNode && sonNode) fatherNode.removeChild(sonNode)
}