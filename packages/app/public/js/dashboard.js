
if (document.addEventListener){
    window.addEventListener('load',getMetric(),false);

} else {
    window.attachEvent('onload',getMetric());
}

function toggleMenu(){
    let toggle = document.querySelector('.toggle');
    let navigation = document.querySelector('.navigation');
    let main = document.querySelector('.main');
    toggle.classList.toggle('active')
    navigation.classList.toggle('active')
    main.classList.toggle('active')
}

/*
function getMetric(){
    let

}*/

