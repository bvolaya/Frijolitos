let user =
    {
        "id":1,
        "firstName":"Camila Andrea",
        "lastName": "Gomez",
        "mail":"gomez@gmail.com", 
        image: "camila.jpg", 
        "isVerify":true
    }
    
let actividades = [
    {
        id:1,
        "title": "Ejemplo", 
        "description": "ejemploDescripcion",
    },
    {
        id:2,
        "title": "Ejemplo1", 
        "description": "ejemploDescripcion1",
    },
    {
        id:3,
        "title": "Ejemplo2", 
        "description": "ejemploDescripcion2",
    }
]

if (document.addEventListener){
    window.addEventListener('load',insertUser(user),false);
    window.addEventListener('load',insertAgenda(actividades),false);

} else {
    window.attachEvent('onload',insertUser(user));
    window.attachEvent('onload',insertAgenda(actividades));
}

function insertUser(data) {
    var div = document.getElementById("perfil")
    let divFather = document.createElement("div")
        divFather.className = "row padre";
    if (data){

            let div1 = document.createElement("div")
            div1.className = "col-12 my-13 pt-3 shadow"
            let img = document.createElement("img");
            img.src = "../img/"+data.image 
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
            a.id = "Activ_"+data[index].id
            a.href = "javascript:eliminarActividad('Activ_"+data[index].id+"')";
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
function eliminarActividad(id){
   
    if (confirm("¿Está seguro de eliminar la actividad?")){
        let data = JSON.stringify({
            suscriptorId: id.split('_')[1]
          });
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body, data,
          redirect: "follow",
        };
        
        fetch("http://localhost:3000/eliminarActividadUser", requestOptions)
          .then((response) => {
              if (response.ok) {
                return response.text();
              } else if(response.status==401){
                throw new Error("Error del servidor");
              }else{
                  throw new Error("Error Interno");
              }       })
          .then((result) => {
            console.log(result);
            document.getElementById(id).parentElement.parentElement.remove()
            alertify.success('¡Te has salido de la actividad!');
            
          })
          .catch((error) => {
            console.log("error", error);
            alertify.error("Error del servidor");
          });

    }
}