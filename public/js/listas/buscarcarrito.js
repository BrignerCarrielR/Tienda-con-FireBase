
const bucar_carrito = document.getElementById('bucar_carrito')
bucar_carrito.addEventListener("click", function () {
    const codigo_carrito = document.getElementById('codigo_carrito').value
    // Obtener la tabla y el cuerpo de la tabla

    const datoscarrito = firebase.database().ref(`Usuarios/` + codigo_carrito + '/V_Carrito')

    const tablaDatos = document.getElementById('tablaDatos');
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
                        <td><button  onclick="eliminar('${codigo_carrito}','${clave}')">X</button></td>
                    </tr>`;
            }
        }
        tbody.innerHTML = tablaHTML;
    }

    // Escuchar cambios en los objetos y actualizar la tabla
    datoscarrito.on('value', actualizarTabla);

})

function eliminar(cliente, producto) {
    console.log(cliente, producto)
    // Obtener una referencia a la ubicación del elemento que deseas eliminar
    const datoscarrito = firebase.database().ref(`Usuarios/` + cliente + '/V_Carrito/' + producto)
    // Eliminar el elemento utilizando remove() o set(null)
    datoscarrito.remove()
        .then(function () {
            console.log("Elemento eliminado exitosamente");
        })
        .catch(function (error) {
            console.error("Error al eliminar el elemento: " + error);
        });
}