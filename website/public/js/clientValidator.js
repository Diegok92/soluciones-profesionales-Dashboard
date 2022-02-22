window.addEventListener("load", function () {
  const formulario = document.getElementById("clientform");
  

  
  formulario.addEventListener("submit", function (e) {
    let ulErrors = document.querySelector('div.fe-errors ul')
          
    //Reset the ul to empty to avoid duplicating error render
    ulErrors.innerHTML = '';

    let errors = [];

    const firstName = document.querySelector("#firstName");
    const reName = new RegExp(/[^a-zA-Z]/);

    if (
      firstName.value == "" ||
      firstName.value.length < 3 ||
      firstName.value.match(reName) != null //sera nulo solo cuando haya letras
    ) {
      errors.push("tu Nombre debe contener al menos 2 letras");
    }
    const lastName = document.querySelector("#lastName");

    if (
      lastName.value == "" ||
      lastName.value.length < 3 ||
      lastName.value.match(reName) != null
    ) {
      errors.push("tu Apellido debe contener al menos 2 letras");
    }
    const email = document.querySelector("#email");

    const reEmail = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (email.value == "" || email.value.match(reEmail) == null) {
      errors.push("Debes ingresar un Email valido");
    }

    const reNumber = new RegExp(/[^0-9]/);
    if (
      mobile.value == "" ||
      mobile.value.length < 8 ||
      mobile.value.match(reNumber) != null
    ) {
      errors.push("Debes ingresar un telefono valido");
    }

    const city_Id = document.querySelector("#city_Id");

    if (city_Id.value == "") {
      errors.push("Debes seleccionar una Ciudad");
    }

    const address = document.querySelector("#address");
    const reAddress = new RegExp(/[^A-Za-z0-9\s]/);
    console.log(address.value);

    if (address.value == "" || address.value.match(reAddress) != null) {
      errors.push("la direccion debe ser valida, ej: Calle falsa 123");
    }

    const dni = document.querySelector("#dni");
    const reDni = new RegExp(/[^0-9]/);

    if (
      dni.value == "" ||
      dni.value.length < 8 ||
      dni.value.match(reDni) != null
    ) {
      errors.push("DNI sin espacios, puntos ni guiones");
    }

    const role = document.querySelector("#role");

    if (role.value == "") {
      errors.push("Debes seleccionar tu perfil (cliente o profesional)");
    }

    const password = document.querySelector("#password");
    const password2 = document.querySelector("#password2");
    const rePassword = new RegExp(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/
    );

    if (password.value.match(rePassword) == null) {
      errors.push(
        "la contraseña debe tener al menos 8 caracteres, una mayus, un numero,  y algun: ! @ # $ % ^ & * "
      );
    }
    if (password2.value != password.value) {
      errors.push("las contraseñas deben Coincidir ");
    }

    if (errors.length > 0) {
      e.preventDefault();

      

      for (i = 0; i < errors.length; i++) {
        ulErrors.innerHTML += "<li>" + errors[i] + "</li>";
      }
    }
  });
});
