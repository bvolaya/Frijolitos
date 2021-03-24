document.addEventListener("DOMContentLoaded", () => {
    const EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?))[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
    const PASSWD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    var objAlert = $("#alert-message");
    
    $("#email").keyup((e) => {
        var obj = $("#email");
        var val = obj.val();
        var json = {"email": val};
        if (val!="") {
            if (EMAIL_REGEXP.test(val)) {
                obj.removeClass('is-invalid').addClass('is-valid');
            } else {
                obj.removeClass('is-valid').addClass('is-invalid');
            }
        } else {
            obj.removeClass('is-valid is-invalid');
        }
    });

    // $("#rol").change((e) => {
    //     if (e.value=="Guía y creador")
    // });
    
    function passwordValidate() {
        objAlert.removeClass('d-block').addClass('d-none');
        var obj = $("#password");
        var val = obj.val();
        if (val != "") {
            var bool = false;
            if (PASSWD_REGEXP.test(val)) {
                obj.removeClass('is-invalid').addClass('is-valid');
                bool = true;
            } else {
                obj.removeClass('is-valid').addClass('is-invalid');
            }
            return bool;
        } else {
            obj.removeClass('is-valid is-invalid');
        }
        return false;
    }
    
    function passwordConfirmValidate() {
        objAlert.removeClass('d-block').addClass('d-none');
        var obj = $("#password_confirm");
        var val = obj.val();
        if (val != "") {
            var bool = false;
            if (PASSWD_REGEXP.test(val) && $("#password").val() == val) {
                obj.removeClass('is-invalid').addClass('is-valid');
                bool = true;
            } else {
                obj.removeClass('is-valid').addClass('is-invalid');
            }
            return bool;
        } else {
            obj.removeClass('is-valid is-invalid');
        }
        return false;
    }
    
    $("#password").keyup((e) => {
        passwordValidate();
        passwordConfirmValidate();
    });
    
    $("#password_confirm").keyup((e) => {
        passwordConfirmValidate();
    });
    
    $("#form_registro").submit((e) => {
        e.preventDefault();
        // var id = $("#id").val();
        var nombres = $("#nombres").val();
        var apellidos = $("#apellidos").val();
        var email = $("#email").val();
        var password = $("#password").val();
        if (passwordValidate()&&passwordConfirmValidate()) {
            var user = JSON.stringify({
                "firstName": nombres,
                "lastName": apellidos,
                "mail": email,
                "password": password
            });

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: user,
                redirect: "follow",
            };

            fetch("http://localhost:3000/register", requestOptions)
                .then((response) => response.text())
                .then((result) => {
                    // console.log(result)
                    // alert("Succesfull Login")
                    objAlert.removeClass('alert-danger').addClass('alert-success');
                    $("#btn_registrar").removeClass('d-block').addClass('d-none');
                    $("#form_registro").find("input, select, textarea").each((i, e) => {
                        $(e).attr({ "disabled": true });
                    });
                    // configurar valores de sesión
                    sessionStorage.setItem('nombres', result.firstName);
                    sessionStorage.setItem('apellidos', result.lastName);
                    sessionStorage.setItem('correo', result.mail);
                    
                    var cont = 3;
                    objAlert.html(`<b>¡Usuario registrado con éxito!</b>`);
                    objAlert.removeClass('d-none').addClass('d-block');
                    var interval = setInterval(() => {
                        objAlert.html(`<b>¡Usuario registrado con éxito!<br><br>Será redireccionado en ${cont} segundos</b>`);
                        if (cont==0) {
                            clearInterval(interval)
                            window.location.href = "http://localhost:5000/"
                        }
                        cont--;
                    }, 1000);
                })
                .catch((error) => {
                    // console.log("error", error);
                    // alert("Error en el registro");
                    objAlert.removeClass('alert-success').addClass('alert-danger');
                    objAlert.html("Error del servidor.");
                    objAlert.removeClass('d-none').addClass('d-block');
            });

            // $.ajax({
            //     cache: false,
            //     type: "POST",
            //     dataType: "json",
            //     data: user,
            //     url: "http://localhost:3000/register",
            //     success: function (resp) {
            //         objAlert.removeClass('alert-danger').addClass('alert-success');
            //         $("#btn_registrar").removeClass('d-block').addClass('d-none');
            //         $("#form_registro").find("input, select, textarea").each((i, e) => {
            //             $(e).attr({"disabled": true});
            //         });
            //         objAlert.html(resp.mensaje);
            //         objAlert.removeClass('d-none').addClass('d-block');
            //     },
            //     error: function () {
            //         objAlert.removeClass('alert-success').addClass('alert-danger');
            //         objAlert.html("Error del servidor.");
            //         objAlert.removeClass('d-none').addClass('d-block');
            //     }
            // });
        } else {
            objAlert.removeClass('alert-success').addClass('alert-danger');
            objAlert.html("Por favor revise que los campos de contraseña sean válidos.");
            objAlert.removeClass('d-none').addClass('d-block');
        }
    });
});