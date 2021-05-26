if (document.addEventListener){
    window.addEventListener('load',authenticate(),false);
} else {
    window.attachEvent('onload',authenticate());
}


function authenticate (){
    if (!sessionStorage.getItem('user')){
        window.location.href = "http://localhost:5000/login"
    }
}