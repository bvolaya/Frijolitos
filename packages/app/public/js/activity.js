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
    let path = event.path || (event.composedPath && event.composedPath());
    let idActivities = path[3].getAttribute('id')
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
    let user= JSON.parse(sessionStorage.getItem('user')).data.rol
    deleteAllActivities('.cardsfather','.subcards')
    const div = document.querySelector(".cardsfather")
    let divFather = document.createElement("div")
    divFather.className = "cardbox cards";
    if (data.length > 0){
        for (let index = 0; index < data.length; index++) {
            let div1 = document.createElement("div");
            div1.className = "card sombra subcards"
            div1.id = data[index].id
            div1.onclick = (event) => {
                if (event.target.tagName!="BUTTON") {
                    window.location.href = `/detail/${data[index].id}`
                }
            }
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

            if (user === "participant"){
                let button = document.createElement("button");
                button.className = "btn"
                button.textContent = "Unirme"
                button.onclick =  function() {suscribe(event)}
                div3.appendChild(button)
            }
            
            div3.appendChild(h3)
            div4.appendChild(img)
            div3.appendChild(div4)
            div3.appendChild(h4)
            div3.appendChild(h5)
            div3.appendChild(p)
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

function deleteAllActivities(classNodeFather,classNodeSon) {
    //Delete nodo to DOM
    let fatherNode = document.querySelector(classNodeFather)
    /*let sonNode = document.querySelector(classNodeSon)
    if (fatherNode && sonNode) fatherNode.removeChild(sonNode)*/
    if (fatherNode.hasChildNodes()) {
        let children = fatherNode.childNodes;
        for (let i = 0; i < children.length; i++) {
            // do something with each child as children[i]
            // NOTE: List is live, adding or removing children will change the list
            fatherNode.removeChild(children[i]);
        }
    }
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