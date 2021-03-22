 function register(){
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let contraseña=document.getElementById("contraseña").value;
    let email=document.getElementById("email").value;

    let user = JSON.stringify({
      firstName: nombre,
      lastName: apellido,
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

    fetch("http://localhost:3000/register", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        alert("Succesfull Login")
      })
      .catch((error) => {
        console.log("error", error);
        alert("Error en el registro");
      });

    //window.location.href = "file:///C:/Users/Krandon/Documents/Zoftware/Frijolitos/packages/app/html/index.html";
 }

