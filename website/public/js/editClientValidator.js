window.addEventListener('load', function(){
    const $form = document.querySelector('form');

    $form.addEventListener('submit', function(e){

        let ulErrors = document.querySelector('div.fe-errors ul')
        
        //Reset the ul to empty to avoid duplicating error render
        ulErrors.innerHTML = '';
        
        let errors = [];

        const firstName = document.querySelector('#firstName');
        const lastName = document.querySelector('#lastName');
        const email = document.querySelector('#email');
        const mobile = document.querySelector('#mobile');
        const address = document.querySelector('#address');
        const avatar = document.querySelector('#avatar');

        //Valid RegEx structures for each input 
        const regexName = new RegExp(/[^a-zA-Z]/);
        const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const regexNumber = new RegExp(/[^0-9]/);
        const regexAddress = new RegExp(/[^A-Za-z0-9\s]/);
        
        if (firstName.value == '' || firstName.value.length < 2 || firstName.value.match(regexName) != null ) {
            errors.push('Debes ingresar un nombre válido!!!')
        }
        if ( lastName.value == ''  || lastName.value.length < 2 || lastName.value.match(regexName) != null ) {
            errors.push('Debes ingresar un apellido válido!!!')
        }
        if ( email.value == '' || email.value.match(regexEmail) == null ) {
            errors.push('Debes ingresar un email válido!!!')
        }
        if ( mobile.value == '' || mobile.value.match(regexNumber) != null ) {
            errors.push('Debes ingresar un número de teléfono válido!!!')
        }
        if ( address.value == '' || address.value.match(regexAddress) != null ) {
            errors.push('Debes completar tu domicilio!!!')
        }


        
        if (errors.length > 0) {
            e.preventDefault();

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li>${errors[i]}</li>`;                
            }   
        }
    })
})