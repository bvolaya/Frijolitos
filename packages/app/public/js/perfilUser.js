let user =
    {
        "id":1,
        "firstName":"Juan fg",
        "lastName": "Prueba",
        "mail":"prueba@gmail.com",
        "isVerify":true
    }

if (document.addEventListener){
    window.addEventListener('load',insertUser(user),false);
    //window.addEventListener('load',insertAgenda(),false);

} else {
    window.attachEvent('onload',insertUser(user));
    //window.attachEvent('onload',insertAgenda());
}




function insertUser(data) {
    const div = document.getElementById("perfil")
    let divFather = document.createElement("div")
        divFather.className = "row padre";
    if (data){

            let div1 = document.createElement("div")
            div1.className = "col-12 my-13 pt-3 shadow"
            let img = document.createElement("img");
            img.src = "../img/camila.jpg" 
            img.className = "float-left rounded-circle mr-2"
            let h1 = document.createElement("h1");
            h1.textContent = data.firstName
            let h3 = document.createElement("h3");
            h3.textContent = data.mail

            div1.appendChild(img)
            div1.appendChild(h1)
            div1.appendChild(h3)
            divFather.appendChild(div1)
            div.appendChild(divFather)

    }
}

function insertAgenda(data) {
    const div = document.querySelector(".contenedor2")
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
            a.id = "ElimActiv"
            a.style = "padding: 2px; background-color: rgb(70, 143, 238); color: white;"
            a.textContent = "Eliminar Actividad"

            div2.appendChild(h3)
            div2.appendChild(p)
            div2.appendChild(a)
            div1.appendChild(div2)
            divFather.appendChild(div1);
            div.appendChild(divFather);
        }
    }


}