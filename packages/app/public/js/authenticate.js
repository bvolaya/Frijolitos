if (document.addEventListener){
    window.addEventListener('load',authenticate(),false);
} else {
    window.attachEvent('onload',authenticate());
}


function authenticate (){
    let path = location.pathname
    if (!sessionStorage.getItem('user') && path !== '/login'){
        window.location.href = "https://healthspace.club/login"
    }else if(sessionStorage.getItem('user') && path === '/login'){
        window.location.href = "https://healthspace.club/events"
    }
}

function logout() {
    sessionStorage.clear()
}