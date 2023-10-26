
// configuracion de FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyD7BByj7yEys1nUYIfl-OBhkVOW6yG7gAQ",
    authDomain: "tienda-katu.firebaseapp.com",
    projectId: "tienda-katu",
    storageBucket: "tienda-katu.appspot.com",
    messagingSenderId: "1048499962304",
    appId: "1:1048499962304:web:45e9aeafdfc1b49aa90825",
    measurementId: "G-7VFB4YGFGS"
};
firebase.initializeApp(firebaseConfig);


let obtener_codigo = document.getElementById('obtener_codigo');
let registrar = document.getElementById('registrar');

obtener_codigo.addEventListener("click", function () {

    let nombre = document.getElementById('nombre').value;
    let correo = document.getElementById('correo').value;
    let telefono = document.getElementById('telefono').value;
    let codi = document.getElementById('codigo');
    let mostarcodigo = document.getElementById('mostarcodigo');
    let formulario = document.getElementById('formulario');


    if (nombre != '' && correo != '' && telefono != '') {
        function generarCodigo(nombre, correo, telefono) {
            // Obtener los primeros 3 caracteres del nombre en minúsculas.
            let nombreEnMinusculas = nombre.toLowerCase().substr(0, 3);

            // Obtener los dos últimos números del correo electrónico.
            let correoEnNumeros = correo.substr(correo.length - 2);

            // Obtener el primer dígito del número de teléfono.
            let telefonoEnNumeros = telefono.substr(0, 1);

            // Combinar los tres valores en un solo string.
            let stringCombinado = nombreEnMinusculas + correoEnNumeros + telefonoEnNumeros;

            // Generar un código hash de 6 caracteres del string combinado.
            let codigoHash = CryptoJS.SHA256(stringCombinado).toString(CryptoJS.enc.Hex);
            codigoHash = codigoHash.substr(0, 6);

            return codigoHash;
        }
    } else {

        alert('Llene todos los campos')
    }

    let codigo = generarCodigo(nombre, correo, telefono);
    console.log(codigo)

    formulario.style.display = 'none'
    mostarcodigo.style.display = 'block'
    codi.textContent = codigo
    const sembradores = firebase.database().ref('Usuarios/' + codigo)

    const agg_usuario = {
        Correo: correo,
        Nombre: nombre,
        Telefono: telefono
    };

    // Creamos el evento para copiar el texto

    let botonCopiar = document.getElementById("copiar");
    botonCopiar.addEventListener("click", function () {

        navigator.clipboard.writeText(codigo);

        // Mostramos un mensaje de confirmación
        alert("El codigo se ha copiado al portapapeles.");
    });



    sembradores.set(agg_usuario)
        .then(() => {
            console.log('Datos escritos exitosamente');
        })
        .catch((error) => {
            console.error('Error al escribir los datos:', error);
        });


})




