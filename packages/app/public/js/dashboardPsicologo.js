

if (document.addEventListener){
    window.addEventListener('load',obtenerActividad(),false);
    window.addEventListener('load',aproveActivity(),false);

} else {
    window.attachEvent('onload',obtenerActividad());
    window.attachEvent('onload', aproveActivity());
}

function obtenerActividad () {
    console.log("obteniendo actividades");
    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    ///////////////////REVISAR LOCALHOST/////////////
    let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
    fetch(`http://localhost:3000/activities/${idUser}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result).data;
            insertActivitiesDH(data)
        })
        .catch(error => console.log('error', error));
}

function activityPending(){
    
}

function aproveActivity(){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "id": 1,
        "isActive": false
});

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
};

    fetch("http://localhost:3000/activities", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}

function insertActivitiesDH(data) {
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
            div2.className = "actividadPsicologo"
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

function AprobarActividades(data) {
    const tbody = document.querySelector(".tbody")
    let trFather = document.createElement("tr")
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let td1 = document.createElement("td");
            td1.textContent = data[index].title
            let td2 = document.createElement("td");
            td2.textContent = data[index].direction
            let td3 = document.createElement("td");
            td3.textContent = data[index].date
            let td4 = document.createElement("td");
            let a1 = document.createElement("a");
            a1.className = "btn status"
            a1.textContent = "Go!"
            let td5 = document.createElement("td");
            let a2 = document.createElement("a");
            a2.className = "btn status"
            a2.textContent = "Aprobar"
            a2.id = data[index].id
            let td6 = document.createElement("td");
            let a3 = document.createElement("a");
            a3.className = "btn-r status"
            a3.textContent = "why?"

            trFather.appendChild(td1)
            trFather.appendChild(td2)
            trFather.appendChild(td3)
            trFather.appendChild(td4)
            td4.appendChild(a1)
            trFather.appendChild(td5)
            td5.appendChild(a2)
            trFather.appendChild(td6)
            td6.appendChild(a3)
            tbody.appendChild(trFather)
        }
    }else{
        let p = document.createElement("p");
        p.textContent = "No encontramos actividades para mostrarte 🤦‍♂️"
        p.className = "subcards"
        divFather.appendChild(p);
        div.appendChild(divFather);
    }
}
