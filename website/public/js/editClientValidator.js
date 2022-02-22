window.addEventListener('load', function(){
    const $form = document.querySelector('form');

    $form.addEventListener('submit', function(e){

        let ulErrors = document.querySelector('div.fe-errors ul')
        
        //Reset the ul to empty to avoid duplicating error render
        ulErrors.innerHTML = '';
        
        let errors = [];

        const firstName = document.getElementById('firstName');
        const lastName = document.getElementById('lastName');
        const email = document.getElementById('email');
        const mobile = document.getElementById('mobile');
        const address = document.getElementById('address');
        const avatar = document.getElementById('avatar');

        //Valid RegEx structures for each input 
        const regexName = new RegExp(/[^a-zA-Z]/);
        const regexEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        const regexNumber = new RegExp(/[^0-9]/);

        if (firstName.value == '' || firstName.length < 2 || firstName.value.match(regexName) != null ) {
            errors.push('Debes ingresar un nombre válido!!!')
        }
        if ( lastName.value == ''  || lastName.length < 2 || firstName.value.match(regexName) != null ) {
            errors.push('Debes ingresar un apellido válido!!!')
        }
        if ( email.value == '' /*|| email.value.match(regexEmail) != null */) {
            errors.push('Debes ingresar un email válido!!!')
        }
        if ( mobile.value == '' || mobile.value.match(regexNumber) != null ) {
            errors.push('Debes ingresar un número de teléfono válido!!!')
        }
        if ( address.value == '') {
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