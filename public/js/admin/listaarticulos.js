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

const datoscarrito = firebase.database().ref(`Camisetas`)

const tablaDatos = document.getElementById('tablaPedidos');
const tbody = tablaDatos.querySelector('tbody');

function actualizarTabla(snapshot) {

    const data = snapshot.val();
    let tablaHTML = '';
    let contador = 0
    for (const clave in data) {
        if (data.hasOwnProperty(clave)) {
            contador = contador + 1
            const objeto = data[clave];
            console.log(objeto)
            tablaHTML += `<tr>
                        <td>${contador}</td>
                        <td>${objeto.Nombre}</td>
                        <td>${objeto.Talla}</td>
                        <td>$ ${objeto.Precio}</td>
                        <td><img src="${objeto.Imagen}" alt="Imagen"style="width: 100px; height: 100px;"></td>
                    </tr>`;
        }
    }
    tbody.innerHTML = tablaHTML;
}

// Escuchar cambios en los objetos y actualizar la tabla
datoscarrito.on('value', actualizarTabla);
