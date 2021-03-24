if (document.addEventListener){
    window.addEventListener('load',obtenerActividad(),false);
} else {
    window.attachEvent('onload',obtenerActividad());
}

function obtenerActividad (){
    console.log("obteniendo actividades");
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/activities", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(JSON.parse(result)); 
            const div = document.querySelector(".padre")
            let data = JSON.parse(result).data;
            for (let index = 0; index < data.length; index++) {
                let div1 = document.createElement("div");
                div1.className = "col-lg-3 col-md-6" 
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
                div.appendChild(div1);
            } 




        })
        .catch(error => console.log('error', error));

}

function logout() {
    sessionStorage.clear()
}