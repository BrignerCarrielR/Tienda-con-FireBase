
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


const datosref = firebase.database().ref('Usuarios')

// Obtener la tabla y el cuerpo de la tabla
const tablaDatos = document.getElementById('tablaUsuarios');
const tbody = tablaDatos.querySelector('tbody');

// Función para actualizar la tabla con datos de Firebase
function actualizarTabla(snapshot) {
    const data = snapshot.val();
    let tablaHTML = '';
    let contador = 0
    for (const clave in data) {
        contador = contador + 1
        if (data.hasOwnProperty(clave)) {
            const objeto = data[clave];
            console.log(objeto)
            tablaHTML += `<tr>
                        <td>${contador}</td>
                        <td>${clave}</td>
                        <td>${objeto.Nombre}</td>
                        <td>${objeto.Correo}</td>
                        <td>${objeto.Telefono}</td>
                    </tr>`;
        }
    }

    tbody.innerHTML = tablaHTML;
}

// Escuchar cambios en los objetos y actualizar la tabla
datosref.on('value', actualizarTabla);
