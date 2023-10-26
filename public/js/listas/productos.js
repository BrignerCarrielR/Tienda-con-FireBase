
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


const datosref = firebase.database().ref('Camisetas')

// Obtén el contenedor de las cartas
const cartasContainer = document.getElementById("cartas-container");


datosref.on('value', (snapshot) => {
    const data = snapshot.val();

    cartasContainer.innerHTML = '';
    // Itera sobre los datos y crea las cartas
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const camisa = data[key];

            // Crea una columna para la carta
            const columna = document.createElement("div");
            columna.classList.add("col-md-3", "mb-4"); // Clases de Bootstrap para el diseño

            // Crea la carta de Bootstrap
            const carta = document.createElement("div");
            carta.classList.add("card");

            // Añade una imagen en la parte superior de la carta
            const imagen = document.createElement("img");
            imagen.src = camisa.Imagen;
            imagen.classList.add("card-img-top");
            imagen.style.height = '200px'
            carta.appendChild(imagen);

            // Crea el contenido de la carta
            const contenidoCarta = document.createElement("div");
            contenidoCarta.classList.add("card-body");

            // Agrega título, talla, precio y botón a la carta
            contenidoCarta.innerHTML = `
                        <h5 class="card-title">${camisa.Nombre}</h5>
                        <p class="col"><strong>Talla: </strong>${camisa.Talla} <strong>Precio: </strong>$${camisa.Precio}</p>
                        <center>
                            <button class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal_carrito" onclick="guardarcarrito('${key}')"> Al Carrito
                            </button>
                        </center>
                    `;

            // Agrega el contenido a la carta
            carta.appendChild(contenidoCarta);

            // Agrega la carta a la columna
            columna.appendChild(carta);

            // Agrega la columna al contenedor de cartas
            cartasContainer.appendChild(columna);
        }
    }
});

function guardarcarrito(clave) {
    console.log(clave);

    const guardarcarrito = document.getElementById('guardarcarrito');

    guardarcarrito.addEventListener("click", async function () {
        guardarcarrito.disabled = true; // Deshabilita el botón mientras se procesa

        const codigo_compra = document.getElementById('codigo_compra').value;

        if (codigo_compra !== '') {
            console.log(codigo_compra);

            const objetoRef = firebase.database().ref(`Camisetas/${clave}`);
            const objetoSnapshot = await objetoRef.once('value');
            const objeto = objetoSnapshot.val();

            // Obtén el carrito actual del cliente
            const clienteRef = firebase.database().ref(`Usuarios/${codigo_compra}/V_Carrito`);
            const clienteSnapshot = await clienteRef.once('value');
            const carritoCliente = clienteSnapshot.val() || {}; // Si no existe, crea un objeto vacío

            // Elimina solo el elemento específico que deseas reemplazar
            delete carritoCliente[clave];

            // Agrega el nuevo elemento al carrito existente
            carritoCliente[clave] = {
                Nombre: objeto.Nombre,
                Talla: objeto.Talla,
                Precio: objeto.Precio,
                Imagen: objeto.Imagen,
            };

            await clienteRef.set(carritoCliente);

            console.log('Datos escritos exitosamente');

            // Refresca la página después de completar la operación
            location.reload();
        } else {
            alert('Ingresa tu Codigo de compra.');
        }
    });
}










