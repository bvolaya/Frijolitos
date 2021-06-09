
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


function getMetric(){
    if (sessionStorage.getItem('user')){
        let idUser= JSON.parse(sessionStorage.getItem('user')).data.id
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`https://api.healthspace.club/metric/${idUser}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                let data = JSON.parse(result);
                insertDataToDashboard(data)
            })
            .catch(error => console.log('error', error));
    }else {throw new Error("User no Login")}

}

function insertDataToDashboard(data) {
    let rol= JSON.parse(sessionStorage.getItem('user')).data.rol
    if(rol === 'participant'){
        let challengeComplete = document.querySelector('div.challengeCompleted')
        challengeComplete.innerHTML=data.metric.finished
        let challengePending = document.querySelector('div.challengePending')
        challengePending.innerHTML=data.metric.process
    }else if (rol === 'psychology'){
        let challengeCreated = document.querySelector('div.challengeCreated')
        challengeCreated.innerHTML=data.metric.created
    }
}
