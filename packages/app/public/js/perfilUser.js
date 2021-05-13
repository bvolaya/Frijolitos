let user = JSON.parse(sessionStorage.getItem('user')).data
if (document.addEventListener){
    window.addEventListener('load',insertUser(user),false);
    window.addEventListener('load',insertAgenda(),false);

} else {
    window.attachEvent('onload',insertUser(user));
    window.attachEvent('onload',insertAgenda());
}
function insertUser(data) {
    var div = document.getElementById("perfil")
    let divFather = document.createElement("div")
        divFather.className = "row padre";
    if (data){

            let div1 = document.createElement("div")
            div1.className = "col-12 my-13 pt-3 shadow"
            let img = document.createElement("img");
            img.src = "../img/camila.jpg"
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
            let img = document.createElement("img");
            img.src = data[index].image
            img.width = "200"
            let h4 = document.createElement("h4");
            h4.textContent = data[index].direction
            let h5 = document.createElement("h5");
            h5.textContent = data[index].date
            let p = document.createElement("p");
            p.textContent = data[index].description
            let button = document.createElement("button");
            button.className = "btn"
            button.textContent = "Eliminar"
            //button.onclick =  function() {suscribe(event)}

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
            alertify.success(result);
            
          })
          .catch((error) => {
            console.log("error", error);
            alertify.error("Error del servidor");
          });

          
    }
}