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

function redirigir() {
    let nombre = document.getElementById('nombre').value
    let talla = document.getElementById('talla').value
    let precio = document.getElementById('precio').value
    let imagen = document.getElementById('imagen').value

    // Verificar si algún campo está vacío
    if (nombre === '' || talla === '' || precio === '' || imagen === '') {
        alert('Por favor, completa todos los campos antes de continuar.');
        return; // Detiene la ejecución de la función si hay campos vacíos
    }

    let nombreEnMinusculas = nombre.toLowerCase().substr(0, 3);

    let tallaEnNumeros = talla.substr(talla.length - 2);

    let precioEnNumeros = precio.substr(0, 1);

    let stringCombinado = nombreEnMinusculas + tallaEnNumeros + precioEnNumeros;

    // Generar un código hash de 6 caracteres del string combinado.
    let codigoHash = CryptoJS.SHA256(stringCombinado).toString(CryptoJS.enc.Hex);
    codigoHash = codigoHash.substr(0, 6);
    console.log(codigoHash)

    const Camisetas = firebase.database().ref('Camisetas/' + codigoHash)

    const agg_usuario = {
        Nombre: nombre,
        Talla: talla,
        Precio: precio,
        Imagen: imagen
    };

    Camisetas.set(agg_usuario)
        .then(() => {
            console.log('Datos escritos exitosamente');
            window.location.href = '../templates/opciones.html';
        })
        .catch((error) => {
            console.error('Error al escribir los datos:', error);
        });
}