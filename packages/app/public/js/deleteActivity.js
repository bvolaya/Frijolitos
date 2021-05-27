function Eliminar(_this) {
    // console.log(_this.dataset["id"])
    Swal.fire({
        title: '¿Está seguro de eliminar la actividad?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        if (result.isConfirmed) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            let raw = JSON.stringify({
                'isActive': false,
                'id': parseInt(_this.dataset["id"]),
                'title': _this.dataset["title"]
            })

            let requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:3000/activities", requestOptions)
                .then((response) => {
                    if (response.ok) {
                        return response.text();
                    } else if (response.status == 401) {
                        throw new Error("Acceso no autorizado");
                    } else if (response.status == 404) {
                        throw new Error("Página no encontrada");
                    } else {
                        throw new Error("Error Interno");
                    }
                })
                .then((result) => {
                    console.log(result)
                    const success = Swal.mixin({
                        didClose: (toast) => {
                            _this.parentNode.parentNode.parentNode.remove()
                        }
                    })
                    success.fire(
                        '¡Eliminado!',
                        '¡Actividad eliminada!',
                        'success',
                    )
                })
                .catch((error) => {
                    console.log("error", error);
                    Swal.fire(
                        '¡Error!',
                        '¡No se pudo eliminar el evento!',
                        'error',
                    )
                });
        }
    })
}