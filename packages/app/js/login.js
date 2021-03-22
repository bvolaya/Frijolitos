function login(){
    let contraseña=document.getElementById("contraseña").value;
    let email=document.getElementById("email").value;
    let user={
        "mail": email,
        "password": contraseña,
    }
    let requestOptions = {
        method: 'POST',
        body: user,
        redirect: 'follow'
    };
    fetch("http://localhost:3000/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error('error', error));
    window.location.href = "file:///C:/Users/Krandon/Documents/Zoftware/Frijolitos/packages/app/html/index.html";
    }