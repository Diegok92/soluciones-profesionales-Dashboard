window.addEventListener('load', function(){
    const haveLicence = document.getElementsByName('have-licence');
    const licenceDiv = document.getElementsByClassName('licence-div');
    

    haveLicence.addEventListener('change', function(e){
        licenceDiv.classList.remove('licence');
    })
})