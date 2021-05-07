let user =
    {
        "id":1,
        "firstName":"Camilo",
        "lastName": "Arevalo",
        "mail":"Arevalo@gmail.com", 
        image: "camiloG.jpeg", 
        "isVerify":true
    }
    

if (document.addEventListener){
    window.addEventListener('load',insertUser(user),false);
   

} else {
    window.attachEvent('onload',insertUser(user));
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