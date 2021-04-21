var getData = function () {
    var palabras = document.getElementById("palabras").value;
    var nombreEvento = document.getElementById("nombreEvento").value;
    var fecha = document.getElementById("fecha").value;
    var direccion = document.getElementById("direccion").value;
    var descripcion = document.getElementById("descripcion").value;

function getData() {
    let categoria = document.getElementById("palabras").value;
    let nombreEvento = document.getElementById("nombreEvento").value;
    let fecha = document.getElementById("fecha").value;
    let direccion = document.getElementById("direccion").value;
    let descripcion = document.getElementById("descripcion").value;


    function getData() {
        let categoria = document.getElementById("palabras").value;
        let nombreEvento = document.getElementById("nombreEvento").value;
        let fecha = document.getElementById("fecha").value;
        let direccion = document.getElementById("direccion").value;
        let descripcion = document.getElementById("descripcion").value;

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
                        } else {
                            console.log(palabras + " " + nombreEvento + " " + fecha + " " + direccion + " " + descripcion);
                        }
                    }
                }
            }
        }
        try {
            let user = sessionStorage.getItem('user')
            user = JSON.parse(user).data
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                title: nombreEvento,
                direction: direccion,
                description: descripcion,
                date: fecha,
                categorie: categoria,
                userId: user.id
            });

            let requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3000/activities", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    console.log(result)
                    alert("Actividad creada")
                    window.location.href =
                        "http://localhost:5000/html/tableroDeEventos.html";
                })
                .catch((error) => {
                    console.log("error", error);
                    alert("Error no se pudo crear el evento");
                });

        } catch (error) {
            alert("Tienes que loguearte");
            window.location.href =
                "http://localhost:5000/html/login.html";
        }


    }
}
