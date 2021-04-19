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

    fetch("http://localhost:3000/activities", requestOptions)
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
            let h3 = document.createElement("h3");
            h3.textContent = data[index].title
            h3.style = "color: black;";
            let p = document.createElement("p");
            p.textContent = data[index].description
            let a = document.createElement("a");
            a.id = "unirse"
            a.style = "padding: 2px; background-color: rgb(70, 143, 238); color: white;"
            a.textContent = "UNIRSE"

            div2.appendChild(h3)
            div2.appendChild(p)
            div2.appendChild(a)
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