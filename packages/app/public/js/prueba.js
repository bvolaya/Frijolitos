let actividades = [
    {
        id:1,
        "title": "Escuela de Familias",
        image: "../img/bici.jpg",
	    "direccion": "Cl. 63 #45-10",
	    "fecha": "16/05/2021",
        "description": "ejemploDescripcion",
    },
    {
        id:2,
        "title": "Escuela de Familias",
        image: "../img/bici.jpg",
	    "direccion": "Cl. 63 #45-10",
	    "fecha": "16/05/2021",
        "description": "ejemploDescripcion",
    },
    {
        id:3,
        "title": "Escuela de Familias",
        image: "../img/bici.jpg",
	    "direccion": "Cl. 63 #45-10",
	    "fecha": "16/05/2021",
        "description": "ejemploDescripcion",
    }
]



if (document.addEventListener){
    window.addEventListener('load',insertActivities(actividades),false);

} else {
    window.attachEvent('onload',insertActivities(actividades));
}



function insertActivities(data) {
    const div = document.querySelector(".main")
    let divFather = document.createElement("div")
        divFather.className = "cardbox";
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let div1 = document.createElement("div");
            div1.className = "card sombra"
            let div2 = document.createElement("div");
            let div3 = document.createElement("div");
            div3.className = "actividadParticipante"
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
            let button = document.createElement("button");
            button.className = "btn"
            button.textContent = "UNIRSE"
            button.onclick =  function() {suscribe(event)}

            div3.appendChild(h3)
            div3.appendChild(img)
	        div3.appendChild(h4)
            div3.appendChild(h5)
            div3.appendChild(p)
            div3.appendChild(button)
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

function suscribe(event) {

    let idActivities = event.path[1].getAttribute('id')
    let idUser
    if (sessionStorage.getItem('user')){
        idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    }else {throw new Error("User no Login")}


    try {
        let Header = new Headers();
        Header.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "userId": idUser,
            "activityId": idActivities
        });

        const requestOptions = {
            method: 'POST',
            headers: Header,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3000/suscribe", requestOptions)
            .then(response => response.text())
            .then(result => {

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
            .catch(error => console.log('error', error));
    }catch (error){
        console.log(error.message)
    }
}
