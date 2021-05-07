var getData = function () {
    var id = document.getElementById("id").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var mail = document.getElementById("mail").value;
    var contraseña = document.getElementById("contraseña").value;
    var fecha = document.getElementById("fechaNacimiento").value;
    var direccion = document.getElementById("direccionResidencia").value;
    var licencia = document.getElementById("licencia").files[0];
    function getData() {
        let id = document.getElementById("id").value;
        let nombre = document.getElementById("nombre").value;
        let apellido = document.getElementById("apellido").value;
        let mail = document.getElementById("mail").value;
        let contraseña = document.getElementById("contraseña").value;
        let fecha = document.getElementById("fechaNacimiento").value;
        let direccion = document.getElementById("direccionResidencia").value;
        let licencia = document.getElementById("licencia").files[0];
    }
    //console.log(licencia)
    try {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            firstName: nombre,
            lastName: apellido,
            mail: mail,
            password: contraseña,
            date: fecha,
            addres: direccion,
            document: licencia.name
        });

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:3000/registroPsicologos", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                alert("Registro exitoso")
                window.location.href =
                    "http://localhost:5000/html/tableroDeEventos.html";
            })
            .catch((error) => {
                console.log("error", error);
                alert("Error no se pudo registrar");
            });

    } catch (error) {
        alert("Tienes que loguearte");
        window.location.href =
            "http://localhost:5000/html/login.html";
    }

}