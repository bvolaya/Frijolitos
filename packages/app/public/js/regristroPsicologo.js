function submit() {
    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let mail = document.getElementById("mail").value;
    let contrasena = document.getElementById("contraseña").value;
    let nickName = document.getElementById("nickName").value;
    let idDocumentoProfesional = document.getElementById("idDocumentoProfesional").value;
    let yeargraduation = document.getElementById("yeargraduation").value;
    let phone = document.getElementById("phone").value;
    let direccion = document.getElementById("direccionResidencia").value;
    let licencia = document.getElementById("licencia").files[0];
    let documentoCC = document.getElementById("documentoCC").files[0];
    let imgProfile = document.getElementById("imgProfile").files[0];

    try {
        let formdata = new FormData();
        formdata.append("imgProfile", imgProfile);
        formdata.append("firstName", nombre);
        formdata.append("lastName", apellido);
        formdata.append("mail", mail);
        formdata.append("password", contrasena);
        formdata.append("rol", "psychology");
        formdata.append("nickName", nickName);
        formdata.append("imgCC", documentoCC);
        formdata.append("imgCard", licencia);
        formdata.append("cc", id);
        formdata.append("profesionalcard", idDocumentoProfesional);
        formdata.append("direction", direccion);
        formdata.append("phone", phone);
        formdata.append("yeargraduation", yeargraduation);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };



        fetch("http://localhost:3000/register", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result)
                alert("Registro exitoso")
                window.location.href = "http://localhost:5000/login";
            })
            .catch((error) => {
                console.log("error", error);
                alert("Error no se pudo registrar");
            });

    } catch (error) {
        alert("Revisa los datos");
    }

};