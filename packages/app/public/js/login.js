function login(){
    let contraseña=document.getElementById("contraseña").value;
    let email=document.getElementById("email").value;

    let user = JSON.stringify({
      mail: email,
      password: contraseña,
    });

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: user,
      redirect: "follow",
    };

    fetch("http://localhost:3000/login", requestOptions)
      .then((response) => {
          if (response.ok) {
            return response.text();
          } else if(response.status==401){
            throw new Error("Error en Credenciales");
          }else if(response.status== 404){
              throw new Error("Usuario no registrado");
          }else{
              throw new Error("Error Interno");
          }       })
      .then((result) => {
        console.log(result);
        sessionStorage.setItem("user", result);
        window.location.href =
          "http://localhost:5000/html/tableroDeEventos.html";
      })
      .catch((error) => {
        console.log("error", error);
        alert("Revisa las Credenciales");
      });
}