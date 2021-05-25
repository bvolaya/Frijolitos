if (document.addEventListener){
    window.addEventListener('load',menu(),false);

} else {
    window.attachEvent('onload',menu());
}

function menu(){
    let user = JSON.parse(sessionStorage.getItem('user')).data.rol
    if (user === 'psychology'){
        const urlProfile = document.querySelector(".profileUser")
        urlProfile.href='/profile/psychology'
    }
}