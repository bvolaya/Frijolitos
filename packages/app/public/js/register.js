

function register(){
    let nombre=document.getElementById("nombre").value;
    let apellido=document.getElementById("apellido").value;
    let contrasena=document.getElementById("contraseña").value;
    let email=document.getElementById("email").value;
    let nickName = document.getElementById("nickName").value;
    let imgProfile = document.getElementById("imgProfile").files[0];

    let formdata = new FormData();
    formdata.append("imgProfile", imgProfile);
    formdata.append("firstName", nombre);
    formdata.append("lastName", apellido);
    formdata.append("mail", email);
    formdata.append("password", contrasena);
    formdata.append("rol", "participant");
    formdata.append("nickName", nickName);

    let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    };

    fetch("http://localhost:3000/register", requestOptions)
      .then((response) => {
          if (response.statusCode !== 201){
              throw new Error("Error en el registro")
          }else{
              return response.text()
          }
      })
      .then((result) => {
          const confirm = Swal.mixin({
              didClose: (toast) => {
                  window.location.href = "http://localhost:5000/login";
              }
          })
          confirm.fire(
              'Genial',
              'Registro Exitoso, Ahora ingresa con tus credenciales',
              'success',
          )

      })
      .catch((error) => {
        console.log("error", error);
          const confirm = Swal.mixin({
              didClose: (toast) => {

              }
          })
          confirm.fire(
              'Ups Algo salio mal',
              'Revisa los datos ingresados',
              'error',
          )
      });

    //window.location.href = "file:///C:/Users/Krandon/Documents/Zoftware/Frijolitos/packages/app/html/index.html";
}

