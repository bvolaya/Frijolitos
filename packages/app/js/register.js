function register(){
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let contraseña=document.getElementById("contraseña").value;
    let email=document.getElementById("email").value;
    let user={
        "firstName": nombre,
        "lastName": apellido,
        "mail": email,
        "password": contraseña,
    }
    let requestOptions = {
        method: 'POST',
        body: user,
        redirect: 'follow'
    };
    fetch("http://localhost:3000/register", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('error', error));
    window.location.href = "file:///C:/Users/Krandon/Documents/Zoftware/Frijolitos/packages/app/html/index.html";
    }

