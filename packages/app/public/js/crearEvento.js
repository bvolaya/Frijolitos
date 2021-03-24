var getData = function () {
    var palabras = document.getElementById("palabras").value;
    var nombreEvento = document.getElementById("nombreEvento").value;
    var fecha = document.getElementById("fecha").value;
    var direccion = document.getElementById("direccion").value;
    var descripcion = document.getElementById("descripcion").value;

    if (palabras == "") {
        document.getElementById("palabras").focus();
    } else {

        if (nombreEvento == "") {
            document.getElementById("nombreEvento").focus();
        } else {
            if (fecha == "") {
                document.getElementById("fecha").focus();
            } else {
                if (direccion == "") {
                    document.getElementById("direccion").focus();
                } else {
                    if (descripcion == "") {
                        document.getElementById("descripcion").focus();
                    } else{
                        console.log(palabras + " " + nombreEvento + " " + fecha + " " + direccion + " " + descripcion);
                    }
                }
            }
        }
    }
/*     fetch("http://localhost:3000/activities", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result)
        alert("Actividad creada")
      })
      .catch((error) => {
        console.log("error", error);
        alert("Error no se pudo crear el evento");
      }); */
}