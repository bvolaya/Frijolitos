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
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    fetch(`http://localhost:3000/activities/${idUser}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            insertActivitiesToDom(data)
        })
        .catch(error => console.log('error', error));
}
function logout() {
    sessionStorage.clear()
}

// Search

function search(event) {
    let keycode = event.keyCode;
    if(keycode === 13){
        let search = document.getElementById("busqueda")
        console.log("El valor buscado es " + search.value)
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3000/search/" + search.value, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result).data
                // Load new Activities
                    insertActivitiesToDom(data._result)
            }
            )
            .catch(error => console.log('error', error));
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

function insertActivitiesToDom(data) {
    deleteAllActivities('.container','.padre')
    const div = document.querySelector(".container")
    let divFather = document.createElement("div")
        divFather.className = "row padre";
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let div1 = document.createElement("div");
            div1.className = "col-lg-3 col-md-6 sombra"
            let div2 = document.createElement("div");
            div2.className = "service-item"
            div2.id = data[index].id
            let h3 = document.createElement("h3");
            h3.textContent = data[index].title
            h3.style = "color: black;";
            let p = document.createElement("p");
            p.textContent = data[index].description
            let button = document.createElement("button");
            button.className = "join"
            button.style = "padding: 2px; background-color: rgb(70, 143, 238); color: white;"
            button.textContent = "UNIRSE"
            button.onclick =  function() {suscribe(event)}

            div2.appendChild(h3)
            div2.appendChild(p)
            div2.appendChild(button)
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

function deleteAllActivities(classNodeFather,classNodeSon) {
    //Delete nodo to DOM
    let fatherNode = document.querySelector(classNodeFather)
    let sonNode = document.querySelector(classNodeSon)
    if (fatherNode && sonNode) fatherNode.removeChild(sonNode)
}