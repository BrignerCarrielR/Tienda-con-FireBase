
// document.getElementById("solicitar").addEventListener("click", async () => {
//     const codigo_carrito = document.getElementById('codigo_carrito').value;
//     const datoscarritoRef = firebase.database().ref(`Usuarios/${codigo_carrito}/V_Carrito`);

//     datoscarritoRef.once("value").then((snapshot) => {
//         const data = snapshot.val();
//         console.log(data);

//         for (const clave in data) {
//             if (data.hasOwnProperty(clave)) {
//                 const objeto = data[clave];
//                 console.log(objeto.Nombre);

//                 // Genera un identificador único para el pedido
//                 const identificador = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

//                 // Agrega el pedido a la lista de Pedidos del cliente
//                 const pedidosRefclient = firebase.database().ref(`Usuarios/` + codigo_carrito + `/Pedidos/${identificador}`);
//                 pedidosRefclient.set(objeto)
//                     .then(() => {
//                         console.log('Pedido agregado exitosamente a Pedidos');
//                     })
//                     .catch((error) => {
//                         console.error('Error al agregar el pedido:', error);
//                     });

//                 // Agrega el pedido a la lista de Pedidos
//                 const pedidosRef = firebase.database().ref(`Pedidos/${identificador}`);
//                 pedidosRef.set(objeto)
//                     .then(() => {
//                         console.log('Pedido agregado exitosamente a Pedidos');
//                     })
//                     .catch((error) => {
//                         console.error('Error al agregar el pedido:', error);
//                     });

//                 // Elimina el elemento del carrito
//                 console.log("Eliminando elemento del carrito: " + clave);
//                 datoscarritoRef.child(clave).remove()
//                     .then(() => {
//                         console.log("Elemento eliminado exitosamente del carrito");
//                     })
//                     .catch((error) => {
//                         console.error("Error al eliminar el elemento del carrito: " + error);
//                     });
//             }
//         }
//     });
// });

document.getElementById("solicitar").addEventListener("click", async () => {
    const id_Usuario = document.getElementById('codigo_carrito').value;
    const datoscarritoRef = firebase.database().ref(`Usuarios/${id_Usuario}/V_Carrito`);

    // Obtener la información del cliente a partir de su ID
    const clienteRef = firebase.database().ref(`Usuarios/${id_Usuario}`);
    clienteRef.once("value").then((clienteSnapshot) => {
        const clienteData = clienteSnapshot.val(); // Datos del cliente

        // Verificar si el cliente existe
        if (!clienteData) {
            console.error('Cliente no encontrado');
            return;
        }

        datoscarritoRef.once("value").then((snapshot) => {
            const data = snapshot.val();
            console.log(data);

            let listaPedidos = ''; // Aquí almacenaremos la lista de pedidos

            for (const clave in data) {
                if (data.hasOwnProperty(clave)) {
                    const objeto = data[clave];
                    console.log(objeto.Nombre);

                    // Genera un identificador único para el pedido
                    const identificador = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

                    // Agrega el pedido a la lista de Pedidos del cliente
                    const pedidosRefclient = firebase.database().ref(`Usuarios/` + id_Usuario + `/Pedidos/${identificador}`);
                    pedidosRefclient.set(objeto)
                        .then(() => {
                            console.log('Pedido agregado exitosamente a Pedidos');
                        })
                        .catch((error) => {
                            console.error('Error al agregar el pedido:', error);
                        });

                    // Agrega el pedido a la lista de Pedidos
                    const pedidosRef = firebase.database().ref(`Pedidos/${identificador}`);
                    pedidosRef.set(objeto)
                        .then(() => {
                            console.log('Pedido agregado exitosamente a Pedidos');
                        })
                        .catch((error) => {
                            console.error('Error al agregar el pedido:', error);
                        });

                    // Elimina el elemento del carrito
                    console.log("Eliminando elemento del carrito: " + clave);
                    datoscarritoRef.child(clave).remove()
                        .then(() => {
                            console.log("Elemento eliminado exitosamente del carrito");
                        })
                        .catch((error) => {
                            console.error("Error al eliminar el elemento del carrito: " + error);
                        });

                    // Agrega el pedido a la lista de pedidos para el correo
                    listaPedidos += `
                        Nombre: ${objeto.Nombre}
                        Talla: ${objeto.Talla}
                        Precio: $ ${objeto.Precio}
                        Imagen: ${objeto.Imagen}
                    `;
                }
            }

            // Envía el correo utilizando EmailJS después de realizar la solicitud
            const serviceID = 'service_atvwoci';
            const templateID = 'template_gxtcdxi';
            const userID = 'MSBVq_POAKjwB1Ucr';
            console.log(clienteData.Nombre)
            console.log(clienteData.Correo)
            // Define los datos del correo
            const dataCorreo = {
                from_name: clienteData.Nombre, // Utiliza el nombre del cliente
                mensaje: listaPedidos,
                correo_cliente: clienteData.Correo, // Utiliza el correo del cliente
            };

            // Envía el correo utilizando EmailJS
            emailjs.send(serviceID, templateID, dataCorreo, userID)
                .then(function (response) {
                    console.log('Correo enviado con éxito:', response);
                })
                .catch(function (error) {
                    console.error('Error al enviar el correo:', error);
                });
        });
    });
});
